📦 Proyecto Deploys – Gestión de Usuarios (CRUD)
🚀 Descripción

Este proyecto es una aplicación web full-stack que permite gestionar usuarios mediante operaciones CRUD (crear, leer, actualizar y eliminar).

La aplicación está dividida en:

Frontend (HTML, CSS, JavaScript)
Backend (Node.js + Express)
Base de datos en la nube (PostgreSQL con Supabase)
🌐 Demo en producción
🔗 Backend + Frontend:
https://deploy-test-uzhs.onrender.com/
🔗 Repositorio:
https://github.com/leonard1228/Deploy-test
⚙️ Tecnologías utilizadas
Node.js
Express
PostgreSQL (Supabase)
HTML, CSS y JavaScript
Fetch API
Render (deploy del backend)
Git y GitHub
🧠 Arquitectura del sistema

El sistema sigue una arquitectura cliente-servidor:

Frontend → API REST (Express) → Base de datos (Supabase)

El frontend consume la API mediante peticiones HTTP y el backend se encarga de la lógica y la conexión con la base de datos.

🔌 API Endpoints
Usuarios
GET /users → Obtener todos los usuarios
GET /users/:id → Obtener usuario por ID
POST /users → Crear usuario
PUT /users/:id → Actualizar usuario
DELETE /users/:id → Eliminar usuario
🗄️ Base de datos

Se utiliza PostgreSQL en la nube mediante Supabase.

La tabla principal es:

users
id (PK)
name (texto)
email (texto único)
created_at (fecha automática)
🚀 Despliegue
Render

El backend está desplegado en Render.

Render se conecta directamente al repositorio de GitHub y actualiza el servicio automáticamente cuando hay cambios en la rama principal.

📡 Comunicación del sistema

El frontend se comunica con el backend usando fetch() enviando y recibiendo datos en formato JSON.

📸 Evidencias
Interfaz funcionando
Creación de usuarios
Lista de usuarios
Base de datos en Supabase
Backend en Render
📌 Autor

Leonard Rodríguez
Ingeniería de Sistemas – 2026
