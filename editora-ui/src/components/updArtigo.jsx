// Este componente permite editar, publicar/despublicar e excluir um artigo específico.

import { useState, useEffect, useCallback } from "react"; // Importa os hooks do React.
import { useParams, useNavigate } from 'react-router-dom'; // Importa hooks do React Router.
import ArtigoDataService from "../services/artigoDataService"; // Importa o serviço de dados.
import { Link } from "react-router-dom"; // Importa o Link para navegação.

function UpdArtigo() { 
  const { id } = useParams(); // O hook `useParams` pega os parâmetros da URL, neste caso, o 'id' (ex: de /artigos/5).
  const navigate = useNavigate(); // O hook `useNavigate` fornece uma função para navegar programaticamente (ex: após excluir).

  // --- Estado ---
  const initialArtigoState = { // Estado inicial para um artigo.
    id: null,
    titulo: "",
    resumo: "",
    publicado: false
  };
  const [artigoAtual, setArtigoAtual] = useState(initialArtigoState);
  // 'artigoAtual': armazena os dados do artigo que está sendo editado.
  const [mensagem, setMensagem] = useState(""); 
  // 'mensagem': para exibir feedback ao usuário (ex: "Atualizado com sucesso!").

  // --- Buscando Dados ---
  const getArtigo = useCallback((id) => {
    // `useCallback` para memorizar a função que busca um artigo.
    ArtigoDataService.get(id) // Chama o método do serviço para buscar um artigo pelo ID.
      .then(response => {
        setArtigoAtual(response.data); // Atualiza o estado 'artigoAtual' com os dados recebidos.
        console.log("Artigo carregado para edição:", response.data);
      })
      .catch(e => {
        console.error(`Erro ao buscar artigo ${id}:`, e);
      });
  }, []); // Array de dependências vazio, a função é criada apenas uma vez.

  useEffect(() => {
    // `useEffect` para executar uma ação quando o componente montar ou o 'id' mudar.
    if (id) { // Se um 'id' foi passado na URL...
      getArtigo(id); // ...chama a função para buscar os dados desse artigo.
    }
  }, [id, getArtigo]); // Depende de 'id' e 'getArtigo'. Executa se 'id' mudar.

  // --- Manipuladores de Eventos ---
  const handleInputChange = event => {
    // Lida com mudanças nos campos de input.
    const { name, value } = event.target;
    setArtigoAtual({ ...artigoAtual, [name]: value }); // Atualiza a propriedade correspondente no estado 'artigoAtual'.
    setMensagem(""); // Limpa qualquer mensagem de feedback anterior.
  };

  const updateStatus = (status) => {
    // Função para atualizar apenas o status (publicado/não publicado).
    var data = { // Cria um objeto com todos os dados do artigo, mas com o novo status.
      id: artigoAtual.id,
      titulo: artigoAtual.titulo,
      resumo: artigoAtual.resumo,
      publicado: status
    };

    ArtigoDataService.update(artigoAtual.id, data) // Chama o método 'update' do serviço.
      .then(response => {
        setArtigoAtual({ ...artigoAtual, publicado: status }); // Atualiza o estado localmente.
        setMensagem("Status atualizado com sucesso!"); // Define uma mensagem de sucesso.
      })
      .catch(e => {
        console.error("Erro ao atualizar status:", e);
        setMensagem("Erro ao atualizar status.");
      });
  };

  const updateArtigo = () => {
    // Função para salvar todas as alterações feitas no artigo.
    ArtigoDataService.update(artigoAtual.id, artigoAtual)
      .then(response => {
        setMensagem("Artigo atualizado com sucesso!"); // Define mensagem de sucesso.
      })
      .catch(e => {
        console.error("Erro ao atualizar artigo:", e);
        setMensagem("Erro ao atualizar artigo.");
      });
  };

  const deleteArtigo = () => {
    // Função para excluir o artigo.
    if (window.confirm("Tem certeza que deseja excluir este artigo?")) {
      // Exibe uma caixa de diálogo de confirmação no navegador.
      ArtigoDataService.delete(artigoAtual.id)
        .then(response => {
          console.log("Artigo excluído:", response.data);
          navigate("/list"); // Navega o usuário de volta para a lista de artigos após a exclusão.
        })
        .catch(e => {
          console.error("Erro ao excluir artigo:", e);
          setMensagem("Erro ao excluir artigo.");
        });
    }
  };

  // --- Lógica de Renderização ---
   return (
    <div className="cartao-upd">
      {artigoAtual && artigoAtual.id ? (
        <div>
          <h4>Artigo</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="titulo"><strong>Título</strong></label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={artigoAtual.titulo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resumo"><strong>Resumo</strong></label>
              <input
                type="text"
                className="form-control"
                id="resumo"
                name="resumo"
                value={artigoAtual.resumo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-4">
              <label><strong>Status:</strong></label>{" "}
              <b>{artigoAtual.publicado ? "Publicado" : "Não publicado"}</b>
            </div>
          </form>

          <div className="mt-3">
            <button
              className="m-2 btn btn-sm btn-primary"
              onClick={() => updateStatus(!artigoAtual.publicado)}
            >
              Alterar status
            </button>
            <button className="m-2 btn btn-sm btn-danger" onClick={deleteArtigo}>
              Excluir
            </button>
            <button type="button" className="m-2 btn btn-sm btn-success" onClick={updateArtigo}>
              Atualizar
            </button>
          </div>

          <p className="m-2">{mensagem}</p>
        </div>
      ) : (
        <div>
          <br />
          <p><i>Carregando artigo ou artigo não encontrado...</i></p>
        </div>
      )}
    </div>
  );
}

export default UpdArtigo;