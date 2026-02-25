# Sistema de Votaciones UAT

Sistema de votaciones electrónicas para la Universidad Autónoma de Tamaulipas.

## Tecnologías

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Base de Datos:** SQLite
- **Autenticación:** JWT + bcrypt
- **Gráficos:** Chart.js

## Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/C27Ezx/DAWA.git
cd DAWA/uat-votaciones
```

### 2. Instalar dependencias
```bash
# Servidor
cd server && npm install

# Cliente (en otra terminal)
cd ../client && npm install
```

### 3. Iniciar la aplicación
```bash
# Terminal 1 - Servidor (puerto 3001)
cd server && node server.js

# Terminal 2 - Cliente (puerto 5173)
cd client && npm run dev
```

### 4. Acceder en el navegador
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Usuarios de Prueba

| Matrícula | Contraseña | Rol |
|-----------|------------|-----|
| admin | admin123 | Administrador |
| a2223010021 | alumno123 | Alumno |
| a2223010022 | alumno123 | Alumno |
| a2223010023 | alumno123 | Alumno |

## Funcionalidades

- ✅ Login con JWT
- ✅ Votación electrónica
- ✅ Validación de voto único
- ✅ Resultados en tiempo real (admin)
- ✅ Gráficas de barras
- ✅ Colores institucionales UAT

## Generar Documentación

```bash
cd server && node generar_documentacion.js
```

El documento se genera en: `server/Documentacion_Proyecto_Final_UAT.docx`
