import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, BrowserRouter, Route, Link, Outlet, useLocation } from "react-router-dom";

import Home from "./components/home";
import ListArtigo from "./components/listArtigo";
import AddArtigo from "./components/addArtigo";
import UpdArtigo from "./components/updArtigo";

// Moldura cinza com laterais verdes, usada por todas as telas, exceto a inicial
function Layout() {
  const { pathname } = useLocation();
  const ehAdd = pathname.startsWith("/add");
  const ehLista = pathname.startsWith("/list");
  const ehUpd = pathname.startsWith("/artigos");

  let classe = "pagina";
  if (ehAdd) classe += " pagina-add";
  if (ehUpd) classe += " pagina-upd";

  const linkInicio = (
    <Link to="/" style={{ color: "blue", textDecoration: "none" }}>Início</Link>
  );

  return (
    <div className={classe}>
      {/* Na listagem, o "Início" fica no topo para não ser empurrado pelos artigos */}
      {ehLista && <div className="mb-3">{linkInicio}</div>}

      <Outlet />

      {/* Na tela de atualizar, os links ficam ao lado do card (veja updArtigo.jsx) */}
      {!ehLista && !ehUpd && <div className="mt-4">{linkInicio}</div>}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/list" element={<ListArtigo />} />
          <Route path="/add" element={<AddArtigo />} />
          <Route path="/artigos/:id" element={<UpdArtigo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
