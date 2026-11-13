# 📚 Editora

Projeto educacional desenvolvido por alunos de Engenharia de Software, como parte da disciplina de Desenvolvimento Web.

Trata-se de uma aplicação completa para o gerenciamento de artigos de uma editora. O **frontend** é feito em React e consome uma **API RESTful** feita em Node.js com Express e PostgreSQL. É possível cadastrar, listar, buscar por título, atualizar (inclusive o status de publicação) e excluir artigos.

O frontend foi desenvolvido com base no repositório https://github.com/ferrasa/dw.git, utilizando como referência os diretórios `editora-ui` e `frontendEditora`.

## 👥 Integrantes

*   Davi Szeremeta da Cruz
*   Lucas Emanuel Gavet Maichak
*   Vitor Eduardo Silva
*   Maria Clara Nascimento Candiotto

## 🚀 Tecnologias Utilizadas

**Frontend (`editora-ui`)**

*   **React**: construção da interface em componentes
*   **Vite**: ambiente de desenvolvimento e build
*   **React Router**: navegação entre as telas (início, listar, adicionar e atualizar)
*   **Axios**: comunicação com a API
*   **Bootstrap / CSS**: estilização das telas

**Backend (`editora-backend`)**

*   **Node.js** (versão 18 ou superior)
*   **Express 5**: criação das rotas da API
*   **pg (node-postgres)**: conexão com o banco e execução das consultas SQL
*   **cors**: liberação das requisições vindas do frontend
*   **PostgreSQL** (banco de dados relacional)

## 🏗️ Estrutura do Projeto

```
Trabalho-02---React/
├── README.md
├── editora-ui/                 # Frontend (React + Vite)
│   └── src/
│       ├── components/         # home, listArtigo, addArtigo, updArtigo
│       ├── services/           # artigoDataService.js (chamadas à API)
│       ├── http-common.js      # configuração do axios (URL base da API)
│       ├── App.jsx             # rotas e moldura das telas
│       └── App.css
└── editora-backend/            # Backend (Node.js + Express)
    ├── server.js               # inicialização, CORS e rota base /editora
    ├── db.js                   # conexão com o PostgreSQL e criação da tabela
    ├── routes/
    │   └── artigo.routes.js    # rotas (endpoints) dos artigos
    ├── schema.sql              # script SQL da tabela artigos
    └── package.json
```

*   **`routes/artigo.routes.js`**: define os endpoints, valida os dados recebidos e executa as consultas SQL.
*   **`db.js`**: configura o pool de conexões com o PostgreSQL e cria a tabela `artigos` caso ela ainda não exista.
*   **`artigoDataService.js`** (frontend): isola a comunicação com a API; cada método corresponde a um endpoint.

## 🗄️ Banco de Dados

A API usa o banco **PostgreSQL**, com a tabela `artigos`:

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `SERIAL` (chave primária) | Identificador gerado automaticamente. |
| `titulo` | `VARCHAR(255)`, obrigatório | Título do artigo. |
| `resumo` | `TEXT` | Resumo do artigo. |
| `publicado` | `BOOLEAN` (padrão `false`) | Indica se o artigo está publicado. |
| `created_at` | `TIMESTAMPTZ` | Data e hora de criação (uso interno, não é enviada ao frontend). |

A tabela é criada automaticamente quando o servidor inicia. O mesmo script está disponível em `editora-backend/schema.sql` para ser executado manualmente no pgAdmin, se preferir.

### Configuração da conexão (`editora-backend/db.js`)

Os valores abaixo são os padrões e podem ser alterados no próprio arquivo ou por variáveis de ambiente (`PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`):

```js
const pool = new pg.Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "sua_senha",
  database: process.env.PGDATABASE || "editora",
});
```

A API roda na porta **8000** e o frontend, na **5173**.

## 📍 Endpoints da API

A URL base da API é `http://localhost:8000/editora`. O CORS está liberado para o frontend (`http://localhost:5173`).

| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/editora` | Lista todos os artigos, do mais novo para o mais antigo. Aceita o parâmetro `?titulo=` para busca parcial, sem diferenciar maiúsculas de minúsculas. |
| `GET` | `/editora/{id}` | Retorna os detalhes de um artigo pelo seu ID. |
| `POST` | `/editora` | Cria um novo artigo. |
| `PUT` | `/editora/{id}` | Atualiza um artigo existente (título, resumo e status). |
| `DELETE` | `/editora/{id}` | Exclui um artigo pelo ID. |
| `DELETE` | `/editora` | Exclui **todos** os artigos. |

### Formato do artigo

```json
{
  "id": 1,
  "titulo": "Título do artigo",
  "resumo": "Resumo do artigo",
  "publicado": false
}
```

### Exemplos

**Criar artigo** (`POST /editora`)

```json
{
  "titulo": "Meu primeiro artigo",
  "resumo": "Um resumo curto sobre o artigo."
}
```

Resposta (`201 Created`):

```json
{
  "id": 1,
  "titulo": "Meu primeiro artigo",
  "resumo": "Um resumo curto sobre o artigo.",
  "publicado": false
}
```

**Atualizar artigo** (`PUT /editora/1`): envie os três campos.

```json
{
  "titulo": "Meu primeiro artigo (revisado)",
  "resumo": "Resumo atualizado.",
  "publicado": true
}
```

**Buscar por título**: `GET /editora?titulo=primeiro` retorna uma lista com os artigos cujo título contém "primeiro".

### Códigos de resposta

| Código | Quando acontece |
| :--- | :--- |
| `200 OK` | Consulta, atualização ou exclusão realizada com sucesso. |
| `201 Created` | Artigo criado com sucesso. |
| `400 Bad Request` | O título não foi informado (`{"message": "O título é obrigatório."}`). |
| `404 Not Found` | Artigo não encontrado ou ID inválido (`{"message": "Artigo não encontrado."}`). |
| `500 Internal Server Error` | Erro inesperado no servidor. |

## 🖥️ Telas do Frontend

| Rota | Tela | O que faz |
| :--- | :--- | :--- |
| `/` | Início | Menu com os botões "Adicionar artigo" e "Listar artigos". |
| `/add` | Adicionar artigo | Formulário com título e resumo. Avisa quando algum campo não foi preenchido. |
| `/list` | Listar artigos | Lista os artigos, permite buscar por título, selecionar um artigo para ver os detalhes (e clicar de novo para fechar), ir para a edição e excluir todos (com confirmação). |
| `/artigos/:id` | Atualizar artigo | Edita título e resumo, altera o status (publicado ou não) e exclui o artigo. Acessada pelo botão "Editar" da listagem. |

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos

*   **Node.js** 18 ou superior (e o npm)
*   **PostgreSQL** rodando localmente na porta `5432`
*   **pgAdmin** (opcional, para visualizar o banco)

### 1. Banco de dados

1.  Crie um banco de dados chamado `editora` (no pgAdmin: botão direito em *Databases > Create > Database*).
2.  Confira, em `editora-backend/db.js`, se o usuário e a senha correspondem aos do seu PostgreSQL (altere o valor `"sua_senha"` ou use as variáveis de ambiente).

### 2. Backend

```bash
cd editora-backend
npm install
npm run dev
```

Se tudo estiver certo, o terminal mostra "Conectado ao PostgreSQL." e "API rodando em http://localhost:8000/editora". Para testar, acesse `http://localhost:8000/editora` no navegador: deve aparecer uma lista vazia (`[]`).

### 3. Frontend

Em outro terminal:

```bash
cd editora-ui
npm install
npm run dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

> O frontend usa a URL base `http://localhost:8000/editora`, definida em `editora-ui/src/http-common.js`. Se a API rodar em outro endereço ou porta, altere esse arquivo.
