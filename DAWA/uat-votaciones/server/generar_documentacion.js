const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const path = require('path');

async function generarDocumentacion() {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: "DOCUMENTACION TECNICA DEL PROYECTO",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: "Sistema de Votaciones Electronicas - Universidad Autonoma de Tamaulipas (UAT)",
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        
        // SECCION 1: INTRODUCCION
        new Paragraph({ text: "1. INTRODUCCION", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Contexto", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("La Universidad Autonoma de Tamaulipas (UAT) busca modernizar sus procesos democraticos estudiantiles mediante la implementacion de un sistema de votaciones electronicas. Este proyecto surge de la necesidad de actualizar los metodos tradicionales de eleccion de representantes estudiantiles, que hasta ahora se realizaban de manera manual con papeletas fisicas.")]
        }),
        new Paragraph({ text: "Problematica", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Los procesos electorales actuales basados en papel presentan multiples inconvenientes: son lentos de ejecutar, generan costos significativos en materiales impresos, requieren considerable mano de obra para el conteo manual de votos, y son susceptibles a errores humanos en el registro y contabilidad. Ademas, la falta de transparencia en el proceso de conteo puede generar desconfianza entre los participantes.")]
        }),
        new Paragraph({ text: "Justificacion", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Un sistema web de votaciones electronicas ofrece multiples beneficios: reduce significativamente los costos operativos, acelera el proceso de conteo de votos de horas a segundos, garantiza transparencia mediante registros digitales auditables, y permite la participacion mas eficiente de los estudiantes. La solucion tecnologica propuesta asegura la integridad del proceso democratico institucional.")]
        }),
        new Paragraph({ text: "Stakeholders", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Los principales grupos interesados en el proyecto son: Estudiantes (usuarios votantes), Docentes y personal administrativo (supervisores del proceso), Administradores de TI (encargados del mantenimiento del sistema), y Direccion universitaria (interesados en resultados transparentes).")]
        }),

        // SECCION 2: OBJETIVOS
        new Paragraph({ text: "2. OBJETIVOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Objetivo General", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Desarrollar una aplicacion web segura, eficiente y accesible para gestionar votaciones universitarias, garantizando la integridad del proceso democratico estudiantil de la Universidad Autonoma de Tamaulipas.")]
        }),
        new Paragraph({ text: "Objetivos Especificos", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("OE-01: Garantizar la unicidad del voto, impidiendo que un estudiante emita mas de una votacion.")] }),
        new Paragraph({ children: [new TextRun("OE-02: Proveer resultados en tiempo real con conteo automatico de votos.")] }),
        new Paragraph({ children: [new TextRun("OE-03: Asegurar la disponibilidad 24/7 del sistema durante el periodo electoral.")] }),
        new Paragraph({ children: [new TextRun("OE-04: Implementar autenticacion segura mediante credenciales institucionales.")] }),
        new Paragraph({ children: [new TextRun("OE-05: Generar reportes graficos para visualizacion de resultados.")] }),
        new Paragraph({ text: "Indicadores de Desempeno (KPIs)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("KPI-01: Tiempo promedio de votacion < 1 minuto por alumno.")] }),
        new Paragraph({ children: [new TextRun("KPI-02: Disponibilidad del sistema > 99.5% durante eleccion.")] }),
        new Paragraph({ children: [new TextRun("KPI-03: Cero votos duplicados registrados.")] }),

        // SECCION 3: ALCANCE
        new Paragraph({ text: "3. ALCANCE", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Alcance Incluido", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("- Sistema de autenticacion de usuarios con validacion de credenciales")] }),
        new Paragraph({ children: [new TextRun("- Emision de votos electronicos con confirmacion visual")] }),
        new Paragraph({ children: [new TextRun("- Conteo automatico de votos en tiempo real")] }),
        new Paragraph({ children: [new TextRun("- Visualizacion grafica de resultados (graficas de barras)")] }),
        new Paragraph({ children: [new TextRun("- Panel de administracion para supervisores")] }),
        new Paragraph({ children: [new TextRun("- Base de datos persistente SQLite")] }),
        new Paragraph({ children: [new TextRun("- Interface responsiva para dispositivos moviles")] }),
        new Paragraph({ text: "Alcance Excluido", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("- Voto remoto fuera de la red institucional (intranet)")] }),
        new Paragraph({ children: [new TextRun("- Verificacion biometrica de identidad")] }),
        new Paragraph({ children: [new TextRun("- Integracion con sistemas externos de gestion universitaria")] }),
        new Paragraph({ children: [new TextRun("- Votacion electronica certificada con firma digital")] }),

        // SECCION 4: ANALISIS DE REQUISITOS
        new Paragraph({ text: "4. ANALISIS DE REQUISITOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Requisitos Funcionales", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "RF-01 Autenticacion de Usuarios: ", bold: true }), new TextRun("El sistema debe permitir la autenticacion de usuarios mediante matricula y contrasena, validando las credenciales contra la base de datos institucional.")] }),
        new Paragraph({ children: [new TextRun({ text: "RF-02 Emision de Votos: ", bold: true }), new TextRun("El sistema debe permitir a los usuarios autenticados emitir un unico voto, seleccionando de una lista de candidatos disponibles.")] }),
        new Paragraph({ children: [new TextRun({ text: "RF-03 Visualizacion de Resultados: ", bold: true }), new TextRun("El sistema debe mostrar en tiempo real los resultados de la votacion mediante graficas y tablas a los administradores.")] }),
        new Paragraph({ text: "Requisitos No Funcionales", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "RNF-01 Seguridad de Datos: ", bold: true }), new TextRun("Las contrasenas deben almacenarse hasheadas utilizando bcrypt. Los tokens JWT deben expirar en 24 horas.")] }),
        new Paragraph({ children: [new TextRun({ text: "RNF-02 Disponibilidad: ", bold: true }), new TextRun("El sistema debe estar disponible durante todo el periodo electoral con un uptime minimo del 99%.")] }),
        new Paragraph({ children: [new TextRun({ text: "RNF-03 Usabilidad: ", bold: true }), new TextRun("La interfaz debe ser intuitiva y permitir completar el proceso de votacion en menos de 60 segundos.")] }),
        new Paragraph({ text: "Flujo de Usuario (User Flow)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("El flujo principal de interaccion es: (1) Usuario accede al sistema web -> (2) Ingresa matricula y contrasena -> (3) Sistema valida credenciales -> (4) Si es alumno, muestra panel de votacion -> (5) Usuario selecciona candidato -> (6) Sistema solicita confirmacion -> (7) Usuario confirma -> (8) Sistema registra voto y marca usuario como votado -> (9) Muestra mensaje de agradecimiento. Para administradores: (4b) Muestra panel con graficas de resultados.")]
        }),

        // SECCION 5: ARQUITECTURA DEL SISTEMA
        new Paragraph({ text: "5. ARQUITECTURA DEL SISTEMA", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({
          children: [new TextRun("El sistema implementa una arquitectura Cliente-Servidor de tres capas, separando claramente las responsabilidades entre frontend, backend y persistencia de datos.")]
        }),
        new Paragraph({ text: "Capa de Presentacion (Frontend)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Aplicacion SPA (Single Page Application) desarrollada con React.js y Vite como bundler. Utiliza TailwindCSS para estilos siguiendo la identidad visual institucional UAT. Se comunica con el backend mediante peticiones HTTP a traves de la API REST.")]
        }),
        new Paragraph({ text: "Capa de Logica de Negocio (Backend)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Servidor Node.js con framework Express.js que expone una API REST. Implementa autenticacion JWT, validacion de votos, control de sesiones y logica de negocio para el proceso electoral.")]
        }),
        new Paragraph({ text: "Capa de Persistencia (Base de Datos)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Base de datos relacional SQLite almacenada en archivo local (uat_votes.db). Contiene las tablas: usuarios, candidatos, y configuracion. Ofrece portabilidad y facil configuracion sin requerir servidor de base de datos dedicado.")]
        }),

        // SECCION 6: TECNOLOGIAS Y HERRAMIENTAS
        new Paragraph({ text: "6. TECNOLOGIAS Y HERRAMIENTAS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Categoria", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tecnologia", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Version/Proposito", bold: true })] })] }),
              ]
            }),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Lenguaje")] }),
              new TableCell({ children: [new Paragraph("JavaScript (ES6+)")] }),
              new TableCell({ children: [new Paragraph("Lenguaje principal full-stack")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Frontend")] }),
              new TableCell({ children: [new Paragraph("React + Vite")] }),
              new TableCell({ children: [new Paragraph("SPA con hot-reload")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Estilos")] }),
              new TableCell({ children: [new Paragraph("TailwindCSS")] }),
              new TableCell({ children: [new Paragraph("Framework CSS utility-first")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Backend")] }),
              new TableCell({ children: [new Paragraph("Node.js + Express")] }),
              new TableCell({ children: [new Paragraph("Servidor y API REST")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Base de Datos")] }),
              new TableCell({ children: [new Paragraph("SQLite3")] }),
              new TableCell({ children: [new Paragraph("BD relacional embebida")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Seguridad")] }),
              new TableCell({ children: [new Paragraph("bcryptjs + JWT")] }),
              new TableCell({ children: [new Paragraph("Hash de passwords y sesiones")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Graficos")] }),
              new TableCell({ children: [new Paragraph("Chart.js + react-chartjs-2")] }),
              new TableCell({ children: [new Paragraph("Visualizacion de datos")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Documentacion")] }),
              new TableCell({ children: [new Paragraph("docx (npm)")] }),
              new TableCell({ children: [new Paragraph("Generacion de documentos Word")] }),
            ]}),
          ]
        }),

        // SECCION 7: MODELADO DE DATOS
        new Paragraph({ text: "7. MODELADO DE DATOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Tabla: Usuarios", heading: HeadingLevel.HEADING_2 }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Campo", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tipo", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Descripcion", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("id")] }),
              new TableCell({ children: [new Paragraph("INTEGER")] }),
              new TableCell({ children: [new Paragraph("Clave primaria autoincremental")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("matricula")] }),
              new TableCell({ children: [new Paragraph("TEXT (UNIQUE)")] }),
              new TableCell({ children: [new Paragraph("Identificador unico del estudiante")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("nombre")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Nombre completo del usuario")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("password")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Contrasena hasheada con bcrypt")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("rol")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Rol: 'admin' o 'alumno'")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("facultad")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Facultad de procedencia")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("ha_votado")] }),
              new TableCell({ children: [new Paragraph("INTEGER")] }),
              new TableCell({ children: [new Paragraph("Flag booleano (0/1) para control de voto")] }),
            ]}),
          ]
        }),
        new Paragraph({ text: "Tabla: Candidatos", heading: HeadingLevel.HEADING_2, spacing: { before: 200 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Campo", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tipo", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Descripcion", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("id")] }),
              new TableCell({ children: [new Paragraph("INTEGER")] }),
              new TableCell({ children: [new Paragraph("Clave primaria autoincremental")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("nombre")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Nombre del candidato")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("partido")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Nombre del partido o slogan")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("foto")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("URL de la foto del candidato")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("descripcion")] }),
              new TableCell({ children: [new Paragraph("TEXT")] }),
              new TableCell({ children: [new Paragraph("Propuestas o descripcion breve")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("votos")] }),
              new TableCell({ children: [new Paragraph("INTEGER")] }),
              new TableCell({ children: [new Paragraph("Contador de votos recibidos")] }),
            ]}),
          ]
        }),

        // SECCION 8: DISENO DE INTERFACES
        new Paragraph({ text: "8. DISENO DE INTERFACES", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Pantalla de Login", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Interfaz de autenticacion con los colores institucionales UAT. Presenta el logo UAT en la cabecera, campos de entrada para matricula y contrasena, boton de acceso con gradiente naranja (#d14900 a #F05A28), y panel informativo con credenciales de prueba para desarrollo.")]
        }),
        new Paragraph({ text: "Panel de Votacion (Alumno)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Dashboard principal para estudiantes que muestra: mensaje de bienvenida personalizado, grid de tarjetas con candidatos (foto, nombre, partido, propuestas), boton 'Votar' en cada tarjeta que abre modal de confirmacion, y mensaje post-votacion agradeciendo la participacion.")]
        }),
        new Paragraph({ text: "Panel de Administracion", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Interfaz exclusiva para administradores con: grafica de barras con resultados en tiempo real (actualizacion cada 5 segundos), contador total de votos, tabla detallada con candidatos y porcentajes, y barra de progreso visual por candidato.")]
        }),
        new Paragraph({ text: "Paleta de Colores UAT", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("Primario: Naranja UAT (#d14900, #F05A28) - botones y acentos")] }),
        new Paragraph({ children: [new TextRun("Secundario: Azul Marino (#002F6C) - textos destacados y cabeceras")] }),
        new Paragraph({ children: [new TextRun("Fondo: Blanco/Gris claro (#f8fafc) - superficie base")] }),

        // SECCION 9: SEGURIDAD E INTEGRACIONES
        new Paragraph({ text: "9. SEGURIDAD E INTEGRACIONES", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Hash de Contrasenas (bcrypt)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Las contrasenas de usuario nunca se almacenan en texto plano. Utilizamos bcryptjs con un factor de costo (salt rounds) de 10, generando un hash irreversible que protege las credenciales incluso en caso de brecha de datos. El proceso de verificacion compara el hash almacenado con el hash de la entrada del usuario sin necesidad de desencriptar.")]
        }),
        new Paragraph({ text: "Autenticacion JWT", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("JSON Web Tokens (JWT) gestionan las sesiones de usuario. Al autenticarse exitosamente, el servidor genera un token firmado con una clave secreta (JWT_SECRET) que incluye el ID, matricula, nombre y rol del usuario. Este token tiene expiracion de 24 horas y debe enviarse en el header Authorization de cada peticion protegida.")]
        }),
        new Paragraph({ text: "Control de Acceso", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [new TextRun("Middleware de autenticacion valida el token en cada peticion a rutas protegidas. Middleware adicional de autorizacion verifica el rol 'admin' para rutas de administracion. Rutas publicas limitadas a configuracion general del sistema.")]
        }),

        // SECCION 10: PLAN DE PRUEBAS
        new Paragraph({ text: "10. PLAN DE PRUEBAS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Caso de Prueba 1: Doble Votacion", heading: HeadingLevel.HEADING_2 }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Elemento", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Descripcion", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("ID")] }),
              new TableCell({ children: [new Paragraph("TC-001")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Precondiciones")] }),
              new TableCell({ children: [new Paragraph("Usuario autenticado con matricula 'a2223010021', estado ha_votado=false")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Pasos")] }),
              new TableCell({ children: [new Paragraph("1. Votar por candidato A. 2. Intentar votar nuevamente por candidato B.")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Resultado Esperado")] }),
              new TableCell({ children: [new Paragraph("Segunda votacion rechazada con error: 'Ya has ejercido tu voto'")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Resultado Real")] }),
              new TableCell({ children: [new Paragraph("Exitoso - Sistema bloquea segundo intento correctamente")] }),
            ]}),
          ]
        }),
        new Paragraph({ text: "Caso de Prueba 2: Usuario No Registrado", heading: HeadingLevel.HEADING_2, spacing: { before: 200 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Elemento", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Descripcion", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("ID")] }),
              new TableCell({ children: [new Paragraph("TC-002")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Precondiciones")] }),
              new TableCell({ children: [new Paragraph("Matricula '99999999' no existe en BD")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Pasos")] }),
              new TableCell({ children: [new Paragraph("1. Ingresar matricula '99999999' y cualquier password. 2. Enviar formulario.")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Resultado Esperado")] }),
              new TableCell({ children: [new Paragraph("Error: 'Credenciales invalidas', acceso denegado")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Resultado Real")] }),
              new TableCell({ children: [new Paragraph("Exitoso - Sistema rechaza credenciales inexistentes")] }),
            ]}),
          ]
        }),

        // SECCION 11: METODOLOGIA DE DESARROLLO
        new Paragraph({ text: "11. METODOLOGIA DE DESARROLLO", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({
          children: [new TextRun("Se utilizo una metodologia agil iterativa con el siguiente flujo de trabajo:")]
        }),
        new Paragraph({ children: [new TextRun("Sprint 1: Configuracion de infraestructura y base de datos.")] }),
        new Paragraph({ children: [new TextRun("Sprint 2: Desarrollo de API REST con autenticacion.")] }),
        new Paragraph({ children: [new TextRun("Sprint 3: Implementacion de interfaz de usuario y componentes.")] }),
        new Paragraph({ children: [new TextRun("Sprint 4: Integracion frontend-backend y pruebas.")] }),
        new Paragraph({ children: [new TextRun("Sprint 5: Documentacion tecnica y entrega final.")] }),
        new Paragraph({
          children: [new TextRun("Cada sprint incluyo revision de codigo, pruebas unitarias manuales y ajustes basados en retroalimentacion. El enfoque permitio adaptaciones rapidas a cambios de requisitos y correccion temprana de errores.")]
        }),

        // SECCION 12: ESTIMACION Y PRESUPUESTO
        new Paragraph({ text: "12. ESTIMACION Y PRESUPUESTO", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Concepto", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Cantidad", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Precio Unitario", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Subtotal", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Desarrollador Junior (30 hrs)")] }),
              new TableCell({ children: [new Paragraph("30 horas")] }),
              new TableCell({ children: [new Paragraph("$500 MXN/hr")] }),
              new TableCell({ children: [new Paragraph("$15,000 MXN")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Servidor Cloud (VPS)")] }),
              new TableCell({ children: [new Paragraph("1 ano")] }),
              new TableCell({ children: [new Paragraph("$166 MXN/mes")] }),
              new TableCell({ children: [new Paragraph("$2,000 MXN")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Dominio institucional")] }),
              new TableCell({ children: [new Paragraph("1 ano")] }),
              new TableCell({ children: [new Paragraph("Proporcionado")] }),
              new TableCell({ children: [new Paragraph("$0 MXN")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Certificado SSL")] }),
              new TableCell({ children: [new Paragraph("1 ano")] }),
              new TableCell({ children: [new Paragraph("Let's Encrypt (gratis)")] }),
              new TableCell({ children: [new Paragraph("$0 MXN")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ text: "TOTAL", bold: true })] }),
              new TableCell({ children: [new Paragraph("")] }),
              new TableCell({ children: [new Paragraph("")] }),
              new TableCell({ children: [new Paragraph({ text: "$17,000 MXN", bold: true })] }),
            ]}),
          ]
        }),

        // SECCION 13: GESTION DE RIESGOS
        new Paragraph({ text: "13. GESTION DE RIESGOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Riesgo", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Probabilidad", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Impacto", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Mitigacion", bold: true })] })] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Caida de internet")] }),
              new TableCell({ children: [new Paragraph("Alta")] }),
              new TableCell({ children: [new Paragraph("Alto")] }),
              new TableCell({ children: [new Paragraph("Sistema local con cache offline")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Ataque fuerza bruta")] }),
              new TableCell({ children: [new Paragraph("Media")] }),
              new TableCell({ children: [new Paragraph("Alto")] }),
              new TableCell({ children: [new Paragraph("Rate limiting en API + bloqueo temporal")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Falla de BD")] }),
              new TableCell({ children: [new Paragraph("Baja")] }),
              new TableCell({ children: [new Paragraph("Alto")] }),
              new TableCell({ children: [new Paragraph("Backups automaticos cada 6 hrs")] }),
            ]}),
            new TableRow({ children: [
              new TableCell({ children: [new Paragraph("Manipulacion de votos")] }),
              new TableCell({ children: [new Paragraph("Baja")] }),
              new TableCell({ children: [new Paragraph("Critico")] }),
              new TableCell({ children: [new Paragraph("Logs de auditoria + verificacion de integridad")] }),
            ]}),
          ]
        }),

        // SECCION 14: PLAN DE DESPLIEGUE
        new Paragraph({ text: "14. PLAN DE DESPLIEGUE", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Requisitos del Sistema", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("- Node.js v18 o superior")] }),
        new Paragraph({ children: [new TextRun("- npm v9 o superior")] }),
        new Paragraph({ children: [new TextRun("- 512MB RAM minimo")] }),
        new Paragraph({ children: [new TextRun("- 1GB almacenamiento disponible")] }),
        new Paragraph({ text: "Instrucciones de Instalacion", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("1. Clonar repositorio: git clone <repo-url>")] }),
        new Paragraph({ children: [new TextRun("2. Instalar dependencias servidor: cd server && npm install")] }),
        new Paragraph({ children: [new TextRun("3. Instalar dependencias cliente: cd ../client && npm install")] }),
        new Paragraph({ children: [new TextRun("4. Configurar variables de entorno en archivo .env")] }),
        new Paragraph({ children: [new TextRun("5. Construir frontend: npm run build")] }),
        new Paragraph({ children: [new TextRun("6. Iniciar servidor: cd server && node server.js")] }),
        new Paragraph({ text: "Variables de Entorno (.env)", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("PORT=3001")] }),
        new Paragraph({ children: [new TextRun("JWT_SECRET=clave_secreta_segura")] }),
        new Paragraph({ children: [new TextRun("DB_PATH=./uat_votes.db")] }),

        // SECCION 15: CAPACITACION Y DOCUMENTACION
        new Paragraph({ text: "15. CAPACITACION Y DOCUMENTACION", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Guia de Usuario para Estudiantes", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("Paso 1: Abra el navegador web y acceda a la URL del sistema.")] }),
        new Paragraph({ children: [new TextRun("Paso 2: Ingrese su matricula institucional en el campo correspondiente.")] }),
        new Paragraph({ children: [new TextRun("Paso 3: Escriba su contrasena asignada y presione 'Iniciar Sesion'.")] }),
        new Paragraph({ children: [new TextRun("Paso 4: En el panel de votacion, revise las tarjetas de candidatos.")] }),
        new Paragraph({ children: [new TextRun("Paso 5: Haga clic en el boton 'Votar' de su candidato preferido.")] }),
        new Paragraph({ children: [new TextRun("Paso 6: Confirme su eleccion en el dialogo emergente.")] }),
        new Paragraph({ children: [new TextRun("Paso 7: El sistema mostrara un mensaje de confirmacion de su voto.")] }),
        new Paragraph({ text: "Guia de Usuario para Administradores", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("Paso 1: Autentiquese con credenciales de administrador.")] }),
        new Paragraph({ children: [new TextRun("Paso 2: Acceda al panel de administracion con graficas en tiempo real.")] }),
        new Paragraph({ children: [new TextRun("Paso 3: Monitoree los resultados que se actualizan automaticamente.")] }),
        new Paragraph({ children: [new TextRun("Paso 4: Exporte reportes desde la tabla de resultados (funcionalidad futura).")] }),

        // SECCION 16: CRITERIOS DE ACEPTACION
        new Paragraph({ text: "16. CRITERIOS DE ACEPTACION", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Checklist de Funcionalidades", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun("[x] Sistema de login funcional con validacion de credenciales")] }),
        new Paragraph({ children: [new TextRun("[x] Base de datos SQLite persistente y funcional")] }),
        new Paragraph({ children: [new TextRun("[x] Validacion de voto unico implementada")] }),
        new Paragraph({ children: [new TextRun("[x] Panel de administracion con graficas en tiempo real")] }),
        new Paragraph({ children: [new TextRun("[x] Interfaz con colores institucionales UAT")] }),
        new Paragraph({ children: [new TextRun("[x] API REST completa (login, candidatos, votar, resultados)")] }),
        new Paragraph({ children: [new TextRun("[x] Hash de contrasenas con bcrypt")] }),
        new Paragraph({ children: [new TextRun("[x] Autenticacion JWT con expiracion")] }),
        new Paragraph({ children: [new TextRun("[x] Prevencion de votos duplicados")] }),
        new Paragraph({ children: [new TextRun("[x] Documentacion tecnica generada")] }),

        // SECCION 17: ANEXOS
        new Paragraph({ text: "17. ANEXOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400 } }),
        new Paragraph({ text: "Glosario de Terminos", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "API (Application Programming Interface): ", bold: true }), new TextRun("Conjunto de reglas que permite la comunicacion entre el frontend y backend del sistema.")] }),
        new Paragraph({ children: [new TextRun({ text: "Frontend: ", bold: true }), new TextRun("La parte del sistema que interactua directamente con el usuario (interfaz visual).")] }),
        new Paragraph({ children: [new TextRun({ text: "Backend: ", bold: true }), new TextRun("La parte del sistema que ejecuta la logica de negocio y gestiona los datos.")] }),
        new Paragraph({ children: [new TextRun({ text: "Hash: ", bold: true }), new TextRun("Funcion matematica que transforma datos (como contrasenas) en valores irreversibles para seguridad.")] }),
        new Paragraph({ children: [new TextRun({ text: "JWT (JSON Web Token): ", bold: true }), new TextRun("Estandar para transmitir informacion de forma segura entre sistemas como token firmado.")] }),
        new Paragraph({ children: [new TextRun({ text: "SPA (Single Page Application): ", bold: true }), new TextRun("Aplicacion web que carga una sola pagina y actualiza contenido dinamicamente.")] }),
        new Paragraph({ children: [new TextRun({ text: "SQLite: ", bold: true }), new TextRun("Motor de base de datos relacional embebido que almacena datos en un archivo local.")] }),
        new Paragraph({ children: [new TextRun({ text: "REST (Representational State Transfer): ", bold: true }), new TextRun("Arquitectura para construir servicios web mediante HTTP.")] }),

        new Paragraph({
          text: "Fin del Documento",
          alignment: AlignmentType.CENTER,
          spacing: { before: 600 },
        }),
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'Documentacion_Proyecto_Final_UAT.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Documento generado exitosamente: ${outputPath}`);
}

generarDocumentacion().catch(console.error);
