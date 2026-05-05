export const PORT = Number(process.env.PORT ?? 4000);

export const DB_CONFIG = {
	user: process.env.PGUSER ?? 'postgres',
	password: process.env.PGPASSWORD ?? 'admin',
	host: process.env.PGHOST ?? 'localhost',
	port: Number(process.env.PGPORT ?? 5432),
	database: process.env.PGDATABASE ?? 'taller_bd'
};
