// Ponto de entrada da API da Editora.
import express from "express";
import cors from "cors";
import { iniciarBanco } from "./db.js";
import artigoRoutes from "./routes/artigo.routes.js";

const PORT = process.env.PORT || 8000;

const app = express();

// CORS: libera o frontend (Vite roda em 5173) a chamar esta API.
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

// Prefixo igual ao baseURL do http-common.js: http://localhost:8000/editora
app.use("/editora", artigoRoutes);

// Tratamento de erros genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor." });
});

await iniciarBanco();
console.log("Conectado ao PostgreSQL.");

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}/editora`));
