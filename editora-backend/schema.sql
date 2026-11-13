-- Rode no pgAdmin: clique com o botão direito no banco "editora" > Query Tool.
-- (O servidor também cria a tabela sozinho ao iniciar, se ela não existir.)

CREATE TABLE IF NOT EXISTS artigos (
  id         SERIAL PRIMARY KEY,
  titulo     VARCHAR(255) NOT NULL,
  resumo     TEXT NOT NULL DEFAULT '',
  publicado  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
