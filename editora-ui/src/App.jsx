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
  let classe = "pagina";
  if (pathname.startsWith("/add")) classe += " pagina-add";
  if (pathname.startsWith("/artigos")) classe += " pagina-upd";

  return (
    <div className={classe}>
      <Outlet />
      <div className="mt-4">
        <Link to="/" style={{ color: "blue", textDecoration: "none" }}>Início</Link>
      </div>
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