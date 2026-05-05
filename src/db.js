import pkg from 'pg';
const { Pool } = pkg;
import { DB_CONFIG } from './config.js';

const pool = new Pool(DB_CONFIG);

pool.on('error', (err) => {
  console.error('Error en el pool de conexiones:', err);
});
ssl: {
  rejectUnauthorized: false
}
export default pool;