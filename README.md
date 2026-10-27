# Autores

Davi Szeremeta da Cruz, Lucas Emanuel Gavet Maichak, Vitor Eduardo Silva e Maria Clara Nascimento Candiotto

# 📚 Projeto Editora API (Front-End) (ESSE README NÃO É FINAL(AINDA HÁ COISAS PARA ADICIONAR/REMOVER))

Este é um projeto educacional desenvolvido por alunos de Engenharia de Software, como parte da disciplina de Desenvolvimento Web. 
Trata-se de uma aplicação backend e frontend construída com Spring Boot e React respectivamente, utilizando a arquitetura em camadas (Controller, Service, Repository e Entity), que disponibiliza uma API RESTful para o gerenciamento de autores e artigos de uma editora, permitindo cadastrar, consultar e excluir autores, bem como cadastrar, consultar, atualizar e excluir artigos. 
O projeto foi desenvolvido com base nesse repositório: https://github.com/ferrasa/dw.git, utilizando como referência o diretório "editora_aprimorado".

## 🚀 Tecnologias Utilizadas

*   **Java 17**
*   **Spring Boot 4.1.1**
    *   Spring Web MVC
    *   Spring Data JPA
*   **PostgreSQL** (Banco de Dados Relacional)
*   **Lombok** (Redução de Boilerplate de código)
*   **Maven** (Gerenciamento de Dependências)

## 🏗️ Arquitetura e Estrutura do Projeto

O projeto segue um padrão arquitetural em camadas estritas para separar responsabilidades e facilitar a manutenção e escalabilidade.

### Estrutura de Pacotes (`src/main/java/dw/editora`)

*   **`entity` (ou `model`)**: Contém as classes de modelo (`Artigo.java` e `Autor.java`) que representam as tabelas do banco de dados (anotadas com `@Entity`). Utiliza Lombok para gerar Getters, Setters e Construtores automaticamente em tempo de compilação.
*   **`repository`**: Interfaces (`ArtigoRepository.java` e `AutorRepository.java`) que estendem `JpaRepository`. Responsável pela comunicação direta com o banco de dados e execução de queries. Através da Inversão de Controle, o Spring implementa a classe concreta em tempo de execução.
*   **`service`**: Contém a regra de negócio da aplicação (`ArtigoService.java` e `AutorService.java`). Atuam como intermediários entre o Controller e o Repository, validando dados antes de acessar o banco.
*   **`control`**: Controladores REST (`ArtigoController.java` e `AutorController.java`) que expõem os endpoints da API. Eles recebem as requisições HTTP do cliente, repassam para o `Service` e retornam as respostas serializadas em JSON.

## ⚙️ Configuração do Banco de Dados (`application.properties`)

A aplicação está configurada para rodar na porta **8000**. O banco de dados configurado é o **PostgreSQL**.

```properties
server.port=8000

spring.datasource.url=jdbc:postgresql://localhost:5432/editora
spring.datasource.username=postgres
spring.datasource.password=SENHA
spring.jpa.hibernate.ddl-auto=update
```

## 📍 Endpoints da API

A API responde nos Base Path `/editora/api/artigos` e `/editora/api/autores` e permite requisições Cross-Origin (CORS habilitado globalmente).

| Método HTTP | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/artigos` | Lista todos os artigos (aceita Query Param `?titulo=` para busca parcial). |
| `GET` | `/api/artigos/{id}` | Retorna os detalhes de um artigo específico pelo seu ID. |
| `GET` | `/api/artigos/publicados` | Lista apenas os artigos que possuem o status `publicado = true`. |
| `POST` | `/api/artigos` | Cria e persiste um novo artigo. |
| `PUT` | `/api/artigos/{id}` | Atualiza completamente um artigo existente. |
| `DELETE` | `/api/artigos/{id}` | Exclui um artigo específico pelo ID. |
| `DELETE` | `/api/artigos` | Exclui **todos** os artigos do banco de dados. |
| `POST` | `/api/autores` | Cadastra um novo autor. |
| `GET` | `/api/autores` | Lista todos os autores (aceita Query Param `?nome=` para busca parcial). |
| `GET` | `/api/autores/{id}` | Retorna os detalhes de um autor específico pelo seu ID. |
| `GET` | `/api/autores/{id}/artigos` | Retorna todos os artigos publicados por um autor específico. |
| `DELETE` | `/api/autores/{id}` | Exclui um autor específico pelo ID. |

## 💻 Como Executar o Projeto Localmente

1.  Certifique-se de ter o **Java 17** e o **Maven** instalados em sua máquina.
2.  Tenha uma instância do **PostgreSQL** rodando localmente na porta `5432`.
3.  Crie um banco de dados chamado `editora`. O usuário deve ser `postgres` e a senha `elaia` (ou altere no `application.properties`).
4.  Clone este repositório para sua máquina local.
5.  Pelo terminal, navegue até a pasta raiz do projeto (onde o arquivo `pom.xml` está localizado) e execute:
    ```bash
    mvn spring-boot:run
    ```
6. A API estará pronta para receber requisições em: `http://localhost:8000/editora/api/artigos` e `http://localhost:8000/editora/api/autores`
