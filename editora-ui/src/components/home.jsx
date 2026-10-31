import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-topo">
        <h1>EDITORA</h1>
      </div>
      <div className="home-botoes">
        <Link to="/add" className="home-botao">Adicionar artigo</Link>
        <Link to="/list" className="home-botao">Listar artigos</Link>
        <Link to="/artigos/:id" className="home-botao">Atualizar artigos</Link>
      </div>
    </div>
  );
}

export default Home;