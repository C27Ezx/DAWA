const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'uat_votaciones_secret_key_2024';

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'uat_votes.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      matricula TEXT UNIQUE NOT NULL,
      nombre TEXT NOT NULL,
      password TEXT NOT NULL,
      rol TEXT NOT NULL CHECK(rol IN ('admin', 'alumno')),
      facultad TEXT NOT NULL,
      ha_votado INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS candidatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      partido TEXT NOT NULL,
      foto TEXT,
      descripcion TEXT,
      votos INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS configuracion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      fecha_inicio TEXT NOT NULL,
      fecha_fin TEXT NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) as count FROM usuarios', (err, row) => {
    if (row && row.count === 0) {
      const saltAdmin = bcrypt.genSaltSync(10);
      const hashAdmin = bcrypt.hashSync('admin123', saltAdmin);
      
      const saltAlumno1 = bcrypt.genSaltSync(10);
      const hashAlumno1 = bcrypt.hashSync('alumno123', saltAlumno1);
      
      const saltAlumno2 = bcrypt.genSaltSync(10);
      const hashAlumno2 = bcrypt.hashSync('alumno123', saltAlumno2);
      
      const saltAlumno3 = bcrypt.genSaltSync(10);
      const hashAlumno3 = bcrypt.hashSync('alumno123', saltAlumno3);

      db.run(`INSERT INTO usuarios (matricula, nombre, password, rol, facultad) VALUES (?, ?, ?, ?, ?)`,
        ['admin', 'Administrador Sistema', hashAdmin, 'admin', 'Direccion General']);
      
      db.run(`INSERT INTO usuarios (matricula, nombre, password, rol, facultad) VALUES (?, ?, ?, ?, ?)`,
        ['a2223010021', 'Maria Garcia Lopez', hashAlumno1, 'alumno', 'Facultad de Ingenieria']);
      
      db.run(`INSERT INTO usuarios (matricula, nombre, password, rol, facultad) VALUES (?, ?, ?, ?, ?)`,
        ['a2223010022', 'Carlos Rodriguez Martinez', hashAlumno2, 'alumno', 'Facultad de Derecho']);
      
      db.run(`INSERT INTO usuarios (matricula, nombre, password, rol, facultad) VALUES (?, ?, ?, ?, ?)`,
        ['a2223010023', 'Ana Perez Hernandez', hashAlumno3, 'alumno', 'Facultad de Medicina']);

      db.run(`INSERT INTO candidatos (nombre, partido, foto, descripcion) VALUES (?, ?, ?, ?)`,
        ['Juan Alberto Sanchez', 'Partido Estudiantil UAT', '/candidato1.jpg', 
         'Comprometidos con la transparencia y participacion estudiantil. Mas becas, mejor infraestructura.']);
      
      db.run(`INSERT INTO candidatos (nombre, partido, foto, descripcion) VALUES (?, ?, ?, ?)`,
        ['Laura Patricia Morales', 'Movimiento Universitario', '/candidato2.jpg',
         'Innovacion educativa y tecnologia. Laboratorios modernos y eventos culturales.']);
      
      db.run(`INSERT INTO candidatos (nombre, partido, foto, descripcion) VALUES (?, ?, ?, ?)`,
        ['Roberto Fernando Diaz', 'Frente Solidario', '/candidato3.jpg',
         'Apoyo psicologico, deporte y salud mental. Comunidad unida, estudiantes empoderados.']);

      db.run(`INSERT INTO configuracion (titulo, fecha_inicio, fecha_fin) VALUES (?, ?, ?)`,
        ['Eleccion Representante Estudiantil UAT 2024', '2024-01-15 08:00:00', '2024-01-15 18:00:00']);
    }
  });
});

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticacion requerido' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalido o expirado' });
    }
    req.usuario = usuario;
    next();
  });
};

const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador' });
  }
  next();
};

app.post('/api/login', (req, res) => {
  const { matricula, password } = req.body;
  
  if (!matricula || !password) {
    return res.status(400).json({ error: 'Matricula y contraseña son requeridas' });
  }
  
  db.get('SELECT * FROM usuarios WHERE matricula = ?', [matricula], (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    
    const passwordValido = bcrypt.compareSync(password, usuario.password);
    
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    
    const token = jwt.sign(
      { id: usuario.id, matricula: usuario.matricula, nombre: usuario.nombre, rol: usuario.rol, facultad: usuario.facultad },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      mensaje: 'Autenticacion exitosa',
      token,
      usuario: {
        id: usuario.id,
        matricula: usuario.matricula,
        nombre: usuario.nombre,
        rol: usuario.rol,
        facultad: usuario.facultad,
        haVotado: usuario.ha_votado === 1
      }
    });
  });
});

app.get('/api/candidatos', autenticarToken, (req, res) => {
  db.all('SELECT id, nombre, partido, foto, descripcion, votos FROM candidatos', (err, candidatos) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener candidatos' });
    }
    res.json(candidatos);
  });
});

app.post('/api/votar', autenticarToken, (req, res) => {
  const { candidatoId } = req.body;
  const usuarioId = req.usuario.id;
  
  if (!candidatoId) {
    return res.status(400).json({ error: 'ID de candidato requerido' });
  }
  
  db.get('SELECT ha_votado FROM usuarios WHERE id = ?', [usuarioId], (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar estado de votacion' });
    }
    
    if (usuario.ha_votado === 1) {
      return res.status(400).json({ error: 'Ya has ejercido tu voto. Solo se permite un voto por persona.' });
    }
    
    db.get('SELECT id FROM candidatos WHERE id = ?', [candidatoId], (err, candidato) => {
      if (err || !candidato) {
        return res.status(404).json({ error: 'Candidato no encontrado' });
      }
      
      db.serialize(() => {
        db.run('UPDATE candidatos SET votos = votos + 1 WHERE id = ?', [candidatoId]);
        db.run('UPDATE usuarios SET ha_votado = 1 WHERE id = ?', [usuarioId]);
        
        res.json({ mensaje: 'Voto registrado exitosamente. Gracias por participar en la democracia universitaria.' });
      });
    });
  });
});

app.get('/api/resultados', autenticarToken, esAdmin, (req, res) => {
  db.all('SELECT nombre, partido, votos FROM candidatos ORDER BY votos DESC', (err, resultados) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener resultados' });
    }
    
    const totalVotos = resultados.reduce((sum, c) => sum + c.votos, 0);
    
    res.json({
      resultados: resultados.map(r => ({
        ...r,
        porcentaje: totalVotos > 0 ? ((r.votos / totalVotos) * 100).toFixed(2) : 0
      })),
      totalVotos
    });
  });
});

app.get('/api/configuracion', (req, res) => {
  db.get('SELECT * FROM configuracion WHERE id = 1', (err, config) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener configuracion' });
    }
    res.json(config);
  });
});

app.get('/api/estado-eleccion', autenticarToken, (req, res) => {
  db.get('SELECT ha_votado FROM usuarios WHERE id = ?', [req.usuario.id], (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener estado' });
    }
    res.json({ haVotado: usuario.ha_votado === 1 });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor UAT Votaciones ejecutandose en puerto ${PORT}`);
  console.log(`Base de datos SQLite: ${dbPath}`);
});

module.exports = { app, db };
