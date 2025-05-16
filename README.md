# Monsters Antique - Loja Sobrenatural

Bem-vindo à "Monsters Antique" (também conhecida como Ordem dos Guardiões da Noite)! Uma plataforma de e-commerce fictícia com uma temática sobrenatural, onde você pode encontrar produtos místicos e interagir com uma comunidade através de postagens. Este é um projeto full-stack desenvolvido com HTML, CSS e JavaScript no frontend, e Node.js/Express com SQL Server no backend.

## Sobre o Projeto

Este projeto simula uma loja online completa, desde a visualização de produtos e um carrossel de destaques, até um sistema de carrinho de compras e "nota fiscal". Usuários podem se registrar, fazer login (com autenticação baseada em JWT), visualizar e criar postagens (incluindo upload de imagens). A ideia é criar uma experiência imersiva com uma temática de fantasia e sobrenatural.

## Funcionalidades Principais

* **Frontend:**
    * Página inicial com apresentação da loja, produtos em destaque e últimas postagens.
    * Navegação responsiva com menu hamburger.
    * Barra de busca (funcionalidade de busca a ser implementada no backend).
    * Visualização de produtos estáticos e carregamento dinâmico de produtos via carrossel (a partir da API).
    * Sistema de carrinho de compras interativo com cálculo de total e opções de limpar, imprimir e finalizar compra (simulado no frontend, com potencial para integração backend).
    * Exibição dinâmica das últimas postagens carregadas da API.
    * Links para páginas de Login, Criar Postagem, Sobre Nós, Caridade.
    * Atualização do ícone de perfil do usuário após login.
    * Manifest para PWA.

* **Backend (API):**
    * Endpoints para gerenciamento de Produtos (listar todos, buscar por ID).
    * Endpoints para gerenciamento de Postagens (listar todas, buscar por ID, criar nova postagem com upload de imagem - autenticado).
    * Endpoints para Autenticação de Usuários:
        * Registro (`/register`) com upload de ícone de usuário e hashing de senha.
        * Login (`/login`) com geração de JWT e armazenamento em cookie HTTPOnly.
        * Perfil do Usuário (`/user/profile`) para buscar dados do usuário autenticado.
    * Middleware de autenticação JWT para proteger rotas.
    * Serviço de arquivos estáticos para imagens de posts e usuários.

## Tecnologias Utilizadas

* **Frontend:**
    * HTML5
    * CSS3
    * JavaScript (ES6+)
    * Boxicons
    * Manifest.json (PWA)
* **Backend:**
    * Node.js
    * Express.js
    * SQL Server (com driver `mssql` ou similar)
    * JSON Web Tokens (`jsonwebtoken`)
    * `bcrypt` (para hashing de senhas)
    * `multer` (para uploads de arquivos)
    * `cors`, `cookie-parser`, `dotenv`
* **Banco de Dados:**
    * SQL Server

## Estrutura do Projeto (Simplificada)

* `/` (Raiz do Projeto Frontend)
    * `index.html`
    * `/css`
        * `default-style.css`
        * `index.css`
    * `/js`
        * `default-script.js` (módulo)
        * `index.js`
    * `/img` (para logo, ícones, imagens de produtos estáticos)
    * `/pages` (para outras páginas HTML como login, about, etc.)
    * `manifest.json`

## Pré-requisitos

* Node.js e npm (ou yarn) instalados.
* SQL Server instalado e rodando.
* Um cliente SQL (como SSMS ou Azure Data Studio) para gerenciar o banco de dados.

## Configuração e Execução

### Backend

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/gabrielBehling/Loja-Monstro.git](https://github.com/gabrielBehling/Loja-Monstro.git)
    cd monsters-antique/backend # ou o nome da pasta do seu backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env` na raiz da pasta do backend.
    * Adicione as seguintes variáveis (ajuste os valores conforme necessário):
        ```env
        PORT=3000
        JWT_SECRET=suaChaveSecretaMuitoForte
        DB_USER=seu_usuario_sql
        DB_PASSWORD=sua_senha_sql
        DB_SERVER=localhost # ou seu servidor SQL
        DB_DATABASE=MonstersAntiqueDB # ou nome do seu banco
        ```
4.  **Configure o Banco de Dados:**
    * Certifique-se de que o SQL Server está acessível com as credenciais fornecidas no `.env`.
    * O script `database/setup.js` (ou similar) deve ser capaz de criar o banco de dados e as tabelas necessárias na primeira execução ou através de um comando específico (verifique o código do setup).
5.  **Inicie o servidor backend:**
    ```bash
    npm start # ou node server.js
    ```
    O servidor API deve estar rodando em `http://localhost:3000` (ou a porta definida).

### Frontend

1.  **Navegue até a pasta do frontend:**
    (Geralmente a raiz do projeto clonado, se o backend estiver em uma subpasta)
    ```bash
    cd monsters-antique
    ```
2.  **Abra o `index.html`:**
    * Abra o arquivo `index.html` diretamente no seu navegador.
    * Para uma melhor experiência e para que o CORS funcione corretamente com o backend (que espera origem `http://127.0.0.1:5500`), é recomendado servir os arquivos do frontend com um servidor local. Uma maneira fácil é usando a extensão "Live Server" do VS Code, que tipicamente roda em `http://127.0.0.1:5500` ou uma porta similar.

    *Alternativamente, se o frontend JavaScript faz chamadas para `http://127.0.0.1:3000`, certifique-se que a configuração CORS no backend (`app.use(cors({ origin: "http://127.0.0.1:5500", ... }))`) corresponde à origem de onde o frontend está sendo servido.*

## Como Usar

* Navegue pela loja, visualize produtos.
* Para funcionalidades como criar postagens e ver o perfil, crie uma conta através da página de registro e faça login.
* Adicione itens ao carrinho (a funcionalidade de checkout é simulada no frontend).
