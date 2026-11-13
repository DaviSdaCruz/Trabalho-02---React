// Conexão com o PostgreSQL (pool de conexões).
import pg from "pg";

const pool = new pg.Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "sua_senha", // <- troque pela senha que você definiu no PostgreSQL/pgAdmin
  database: process.env.PGDATABASE || "editora",
});

// Cria a tabela caso ainda não exista.
export async function iniciarBanco() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS artigos (
      id         SERIAL PRIMARY KEY,
      titulo     VARCHAR(255) NOT NULL,
      resumo     TEXT NOT NULL DEFAULT '',
      publicado  BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export default pool;
