# Setup y Guía de Uso - Taller Frontend-Backend

## Instalación de la Base de Datos

### 1. Habilitar psql en PowerShell (ejecuta una sola vez por sesión)

```powershell
& ".\setup-psql.ps1"
```

O manualmente:
```powershell
$env:Path += ";C:\Program Files\PostgreSQL\18\bin"
```

### 2. Conectarse a PostgreSQL como superusuario

```powershell
psql -U postgres
```

**Nota:** Te pedirá la contraseña. Si no la recuerdas, puedes resetearla o cambiar la contraseña en `src/config.js` a la que uses.

### 3. Crear la base de datos y tabla

Ejecuta el script SQL (desde PowerShell, fuera de psql):

```powershell
psql -U postgres -f schema.sql
```

O manualmente, dentro de psql (`psql -U postgres`):

```sql
-- Crear base de datos
CREATE DATABASE taller_bd;

-- Conectar a la base de datos
\c taller_bd;

-- Crear tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO users (name, email) VALUES
  ('Juan Pérez', 'juan@example.com'),
  ('María García', 'maria@example.com'),
  ('Carlos López', 'carlos@example.com');
```

**Comandos útiles en psql:**
- `\l` - Listar todas las bases de datos
- `\c taller_bd` - Conectarse a la BD
- `\dt` - Listar tablas
- `SELECT * FROM users;` - Ver datos
- `\q` - Salir

### 4. Configurar credenciales de BD (opcional)

Si tu usuario/contraseña de PostgreSQL es diferente, actualiza `src/config.js`:

```javascript
export const DB_CONFIG = {
  user: 'tu_usuario',      // Cambiar aquí
  password: 'tu_contraseña', // Cambiar aquí
  host: 'localhost',
  port: 5432,
  database: 'taller_bd'
};
```

### 5. Iniciar el servidor

```powershell
npm run dev
```

El servidor escuchará en http://localhost:4000

## API Endpoints

### GET /users
Obtener todos los usuarios

**Respuesta:**
```json
[
  { "id": 1, "name": "Juan Pérez", "email": "juan@example.com", "created_at": "2026-05-05..." },
  ...
]
```

### GET /users/:id
Obtener un usuario por ID

**Ejemplo:** `GET /users/1`

### POST /users
Crear un nuevo usuario

**Body:**
```json
{
  "name": "Nuevo Usuario",
  "email": "nuevo@example.com"
}
```

### PUT /users/:id
Actualizar un usuario

**Ejemplo:** `PUT /users/1`

**Body:**
```json
{
  "name": "Nombre Actualizado",
  "email": "email@actualizado.com"
}
```

### DELETE /users/:id
Eliminar un usuario

**Ejemplo:** `DELETE /users/1`

## Solucionar Problemas

### Error: "Cannot find package 'pg'"
```powershell
npm install pg
```

### Error: "La BD no existe"
Asegúrate de haber ejecutado el script SQL en `schema.sql`

### Error: "Connection refused"
- Verifica que PostgreSQL esté corriendo
- En Windows, revisa Servicios (services.msc) y reinicia "postgresql-x64-18"

### psql no se reconoce
Ejecuta el setup:
```powershell
& ".\setup-psql.ps1"
```
