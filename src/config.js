export const PORT = Number(process.env.PORT ?? 4000);

export const DB_CONFIG = {
  user: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'admin',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_DATABASE ?? 'postgres'
};
ssl: {
  rejectUnauthorized: false
}