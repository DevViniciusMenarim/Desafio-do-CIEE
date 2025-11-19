# 🦁 Sistema de Gerenciamento de Zoológico

Este projeto é uma solução Full Stack desenvolvida como parte do Desafio Técnico para a equipe de Desenvolvimento do CIEE/PR .

O sistema permite o gerenciamento completo (CRUD) de animais e seus respectivos cuidados veterinários, demonstrando conhecimentos em .NET, React e Boas Práticas de Desenvolvimento .

---

## 📂 Estrutura do Projeto

O repositório está organizado da seguinte forma:

* **`Backend/`**: API REST desenvolvida em .NET Core.
* **`Frontend/`**: Aplicação Web desenvolvida em React (Vite).
* **`Backend.sln`**: Arquivo de solução do .NET.

---

## 🚀 Tecnologias Utilizadas

**Backend:**
* .NET 8 (C#) 
* Entity Framework Core (ORM)
* MySQL (Banco de Dados)
* User Secrets (Segurança de Credenciais)
* Swagger (Documentação Automática)

**Frontend:**
* React.js (Vite) 
* Bootstrap 5 (Interface e Estilização)
* Axios (Consumo de API)
* React Router Dom (Navegação)

---

## 📋 Funcionalidades

O sistema atende aos requisitos funcionais propostos:

* **Animais:** Cadastro, Listagem, Edição e Remoção (CRUD) com validações de campos obrigatórios .
* **Cuidados:** Gerenciamento de procedimentos veterinários e frequência .
* **Interface:** Design responsivo e amigável com feedback visual para o usuário .

---

## 🔐 Configuração de Segurança (Boas Práticas)

Para garantir a segurança e não expor senhas no repositório, utilizamos variáveis de ambiente locais.

### 1. Configurando o Backend (.NET)

Utilizamos **User Secrets**. Siga os passos:

1.  Abra o terminal na pasta do backend:
    ```bash
    cd Backend
    ```
2.  Configure sua senha do MySQL local (substitua `SUA_SENHA` pela real):
    ```bash
    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "server=localhost;database=zoodb;user=root;password=SUA_SENHA"
    ```
3.  Crie o banco de dados:
    ```bash
    dotnet ef database update
    ```
4.  Execute a API:
    ```bash
    dotnet run
    ```
    * A API rodará em: `http://localhost:5153` (verifique o terminal).
    * Swagger: `http://localhost:5153/swagger`.

### 2. Configurando o Frontend (React)

1.  Abra um novo terminal e entre na pasta do frontend:
    ```bash
    cd Frontend
    ```
2.  Crie um arquivo chamado **`.env`** dentro da pasta `Frontend/` e adicione:
    ```env
    VITE_API_URL=http://localhost:5153/api
    ```
3.  Instale as dependências e inicie o projeto:
    ```bash
    npm install
    npm run dev
    ```
4.  Acesse o link exibido no terminal (ex: `http://localhost:5173`).

---

## 🧠 Decisões de Projeto

* **Arquitetura:** Separação clara de responsabilidades entre `Backend` (API) e `Frontend` (Cliente).
* **Segurança:** As credenciais de banco de dados não foram commitadas (uso de *User Secrets* e *.env*), atendendo ao requisito de boas práticas .
* **Validações:** Implementadas via *Data Annotations* no Backend para garantir a integridade dos dados .
* **Banco de Dados:** Utilização do MySQL compatível com Entity Framework, permitindo fácil migração para SQL Server se necessário.

---

**Desenvolvido por:** Vinicius Menarim Humamoto Junior