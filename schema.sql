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
