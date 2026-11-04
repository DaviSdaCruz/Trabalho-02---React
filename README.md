# Autores

Davi Szeremeta da Cruz, Lucas Emanuel Gavet Maichak, Vitor Eduardo Silva e Maria Clara Nascimento Candiotto

# 📚 Projeto Editora API (Front-End) (ESSE README NÃO É FINAL(AINDA HÁ COISAS PARA ADICIONAR/REMOVER))

Este é um projeto educacional desenvolvido por alunos de Engenharia de Software, como parte da disciplina de Desenvolvimento Web. 
Trata-se de uma aplicação back-end e front-end construída com as tecnologias que serão citadas abaixo, utilizando a arquitetura em camadas (Controller, Service, Repository e Entity), que disponibiliza uma API RESTful para o gerenciamento de autores e artigos de uma editora, permitindo cadastrar, consultar, atualizar e excluir artigos. 
O projeto foi desenvolvido com base nesse repositório: https://github.com/ferrasa/dw.git, utilizando como referência os diretórios: "editora_aprimorado", "editora-ui" e "frontendEditora".

## 🚀 Tecnologias Utilizadas

*   **Java 17**
*   **React**: construção da interface em componentes
*   **Vite**: ambiente de desenvolvimento e build
*   **React Router**: navegação entre as telas (listar, adicionar e atualizar)
*   **Axios**: comunicação com a API
*   **Bootstrap / CSS**: estilização das telas
*   **Spring Boot 4.1.1**
    *   Spring Web MVC
    *   Spring Data JPA
*   **PostgreSQL** (Banco de Dados Relacional)
*   **Lombok** (Redução de Boilerplate de código)
*   **Maven** (Gerenciamento de Dependências)

## 🏗️ Arquitetura e Estrutura do Projeto

O projeto segue um padrão arquitetural em camadas estritas para separar responsabilidades e facilitar a manutenção e escalabilidade.

### Estrutura de Pacotes (`src/main/java/dw/editora`)

*   **`entity` (ou `model`)**: Contém as classes de modelo (`Artigo.java`) que representam as tabelas do banco de dados (anotadas com `@Entity`). Utiliza Lombok para gerar Getters, Setters e Construtores automaticamente em tempo de compilação.
*   **`repository`**: Interfaces (`ArtigoRepository.java`) que estendem `JpaRepository`. Responsável pela comunicação direta com o banco de dados e execução de queries. Através da Inversão de Controle, o Spring implementa a classe concreta em tempo de execução.
*   **`service`**: Contém a regra de negócio da aplicação (`ArtigoService.java`). Atuam como intermediários entre o Controller e o Repository, validando dados antes de acessar o banco.
*   **`control`**: Controladores REST (`ArtigoController.java`) que expõem os endpoints da API. Eles recebem as requisições HTTP do cliente, repassam para o `Service` e retornam as respostas serializadas em JSON.

## ⚙️ Configuração do Banco de Dados (`application.properties`)

A aplicação está configurada para rodar na porta **8000**. O banco de dados configurado é o **PostgreSQL**.

```properties
server.port=8000

spring.datasource.url=jdbc:postgresql://localhost:5432/editora
spring.datasource.username=postgres
spring.datasource.password=SENHA
spring.jpa.hibernate.ddl-auto=update
```

## 📡 API

Base URL: `http://localhost:8000/editora`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Lista todos os artigos (aceita `?titulo=`) |
| GET | `/:id` | Busca um artigo |
| POST | `/` | Cria um artigo |
| PUT | `/:id` | Atualiza um artigo |
| DELETE | `/:id` | Exclui um artigo |
| DELETE | `/` | Exclui todos os artigos |

### Exemplo de artigo

```json
{
  "id": 1,
  "titulo": "Título do artigo",
  "resumo": "Resumo do artigo",
  "publicado": false
}
```

## 💻 Como Executar o Projeto Localmente

1.  Certifique-se de ter o **Java 17** e o **Maven** instalados em sua máquina.
2.  Tenha uma instância do **PostgreSQL** rodando localmente na porta `5432`.
3.  Crie um banco de dados chamado `editora`. O usuário deve ser `postgres` e a senha `elaia` (ou altere no `application.properties`).
4.  Clone este repositório para sua máquina local.
5.  Pelo terminal, navegue até a pasta raiz do projeto (onde o arquivo `pom.xml` está localizado) e execute:
    ```bash
    mvn spring-boot:run
    ```
6. A API estará pronta para receber requisições em: `http://localhost:8000/editora/api/artigos`
