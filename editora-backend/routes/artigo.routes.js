import { Router } from "express";
import pool from "../db.js";

const router = Router();

// Colunas devolvidas ao frontend (mesmos campos que ele já usa).
const COLUNAS = "id, titulo, resumo, publicado";

const escapeLike = (s) => s.replace(/[\\%_]/g, "\\$&");

// O id precisa ser um número inteiro
const validaId = (req, res, next) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(404).json({ message: "Artigo não encontrado." });
  }
  next();
};

// GET /editora?titulo=abc -> lista todos (ou filtra por título)
router.get("/", async (req, res) => {
  const { titulo } = req.query;
  const { rows } = titulo
    ? await pool.query(
        `SELECT ${COLUNAS} FROM artigos WHERE titulo ILIKE $1 ORDER BY id DESC`,
        [`%${escapeLike(String(titulo))}%`]
      )
    : await pool.query(`SELECT ${COLUNAS} FROM artigos ORDER BY id DESC`);
  res.json(rows);
});

// GET /editora/:id -> um artigo
router.get("/:id", validaId, async (req, res) => {
  const { rows } = await pool.query(`SELECT ${COLUNAS} FROM artigos WHERE id = $1`, [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: "Artigo não encontrado." });
  res.json(rows[0]);
});

// POST /editora -> cria
router.post("/", async (req, res) => {
  const { titulo, resumo = "", publicado = false } = req.body;
  if (!titulo || !String(titulo).trim()) {
    return res.status(400).json({ message: "O título é obrigatório." });
  }
  const { rows } = await pool.query(
    `INSERT INTO artigos (titulo, resumo, publicado) VALUES ($1, $2, $3) RETURNING ${COLUNAS}`,
    [String(titulo).trim(), resumo, publicado]
  );
  res.status(201).json(rows[0]);
});

// PUT /editora/:id -> atualiza
router.put("/:id", validaId, async (req, res) => {
  const { titulo, resumo = "", publicado = false } = req.body;
  if (!titulo || !String(titulo).trim()) {
    return res.status(400).json({ message: "O título é obrigatório." });
  }
  const { rows } = await pool.query(
    `UPDATE artigos SET titulo = $1, resumo = $2, publicado = $3 WHERE id = $4 RETURNING ${COLUNAS}`,
    [String(titulo).trim(), resumo, publicado, req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: "Artigo não encontrado." });
  res.json(rows[0]);
});

// DELETE /editora -> exclui todos
router.delete("/", async (req, res) => {
  const r = await pool.query("DELETE FROM artigos");
  res.json({ message: `${r.rowCount} artigos excluídos.` });
});

// DELETE /editora/:id -> exclui um
router.delete("/:id", validaId, async (req, res) => {
  const r = await pool.query("DELETE FROM artigos WHERE id = $1", [req.params.id]);
  if (r.rowCount === 0) return res.status(404).json({ message: "Artigo não encontrado." });
  res.json({ message: "Artigo excluído com sucesso." });
});

export default router;
