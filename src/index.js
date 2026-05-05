import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import {PORT} from "./config.js"
import pool from "./db.js"
import userRoutes from "./routes/users.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(userRoutes);

// Validar conexión a BD
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a la BD:', err);
  } else {
    console.log('Conectado a la BD:', res.rows);
  }
});

app.listen(PORT);
console.log("Server escuchando en puerto:", PORT); 