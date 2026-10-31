// Este componente exibe a lista de todos os artigos, permite a busca por título e a seleção para ver detalhes.

import { useState, useEffect, useCallback } from "react"; // Importa os hooks do React.
import ArtigoDataService from "../services/artigoDataService"; // Importa o serviço de dados.
import { Link } from "react-router-dom"; // Importa o componente Link para navegação.

function ListArtigo() { 
  // --- Estado ---
  const [artigos, setArtigos] = useState([]);
  // 'artigos': um array para armazenar a lista de artigos vinda da API. Inicia como um array vazio.
  const [artigoSel, setArtigoSel] = useState(null); 
  // 'artigoSel': o artigo atualmente selecionado na lista. Inicia como nulo.
  const [indice, setIndice] = useState(-1); 
  // 'indice': o índice (posição) do artigo selecionado no array. Inicia como -1 (nenhum selecionado).
  const [tituloPesquisa, setTituloPesquisa] = useState(""); 
  // 'tituloPesquisa': o texto digitado no campo de busca.

  // --- Buscando Dados ---
  const retrieveArtigos = useCallback(() => {
    // `useCallback` memoriza esta função para que ela não seja recriada a cada renderização, otimizando a performance.
    ArtigoDataService.getAll() // Chama o método para buscar todos os artigos.
      .then(response => { // Se a busca for bem-sucedida...
        setArtigos(response.data); // Atualiza o estado 'artigos' com os dados recebidos.
        console.log("Artigos carregados:", response.data);
      })
      .catch(e => { // Se ocorrer um erro...
        console.error("Erro ao buscar artigos:", e);
      });
  }, []); // O array de dependências vazio `[]` significa que a função só será criada uma vez.

  useEffect(() => {
    // O hook `useEffect` executa uma função após a renderização do componente.
    retrieveArtigos(); // Chama a função para buscar os artigos.
  }, [retrieveArtigos]); // O array de dependências `[retrieveArtigos]` garante que o efeito seja executado quando o componente for montado.

  // --- Manipuladores de Eventos (Event Handlers) ---
  const onChangeTituloPesquisa = e => {
    // Atualiza o estado 'tituloPesquisa' conforme o usuário digita no campo de busca.
    setTituloPesquisa(e.target.value);
  };

  const refreshList = () => {
    // Função para recarregar a lista de artigos e limpar a seleção atual.
    retrieveArtigos();
    setArtigoSel(null);
    setIndice(-1);
  };

  const setArtigoAtivo = (artigo, index) => {
    // Função chamada ao clicar em um item da lista.
    setArtigoSel(artigo); // Define o artigo selecionado.
    setIndice(index); // Define o índice do artigo selecionado.
  };

  const removeAll = () => {
    // Função para excluir todos os artigos.
    ArtigoDataService.deleteAll()
      .then(response => {
        console.log("Todos artigos excluídos:", response.data);
        refreshList(); // Atualiza a lista (que agora estará vazia).
      })
      .catch(e => {
        console.error("Erro ao excluir todos artigos:", e);
      });
  };

  const searchTitulo = () => {
    // Função para buscar artigos pelo título.
    setArtigoSel(null); // Limpa a seleção atual ao iniciar uma nova busca.
    setIndice(-1);
    ArtigoDataService.findByTitulo(tituloPesquisa) // Chama o método de busca do serviço.
      .then(response => {
        setArtigos(response.data); // Atualiza a lista com os resultados da busca.
        console.log("Resultado da busca:", response.data);
      })
      .catch(e => {
        console.error("Erro ao buscar por título:", e);
      });
  };

  // --- Lógica de Renderização ---
    return (
    <div className="row">
      <div className="col-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título"
            value={tituloPesquisa}
            onChange={onChangeTituloPesquisa}
            onKeyDown={(e) => e.key === "Enter" && searchTitulo()}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={searchTitulo}>
            Buscar
          </button>
        </div>
      </div>

      <div className="col-md-9">
        <h4>Artigos</h4>
        <ul className="list-group">
          {artigos && artigos.length > 0 ? (
            artigos.map((artigo, index) => (
              <li
                className={"list-group-item " + (index === indice ? "active" : "")}
                onClick={() => setArtigoAtivo(artigo, index)}
                key={artigo.id || index}
                style={{ cursor: "pointer" }}
              >
                {artigo.titulo}
              </li>
            ))
          ) : (
            <li className="list-group-item">Nenhum artigo encontrado.</li>
          )}
        </ul>
        <button
          className="mt-1 btn btn-sm btn-danger"
          onClick={removeAll}
          disabled={artigos.length === 0}
        >
          Excluir todos
        </button>
      </div>

      <div className="col-md-3" style={{ paddingTop: "2.1rem" }}>
        {artigoSel ? (
          <div>
            <div><strong>Título:</strong> {artigoSel.titulo}</div>
            <div><strong>Resumo:</strong> {artigoSel.resumo}</div>
            <div><strong>Status:</strong> {artigoSel.publicado ? "Publicado" : "Não publicado"}</div>
            <Link to={"/artigos/" + artigoSel.id} className="btn btn-warning" role="button">
              Editar
            </Link>
          </div>
        ) : (
          <p><i>Selecione um artigo para ver os detalhes.</i></p>
        )}
      </div>
    </div>
  );
}

export default ListArtigo;