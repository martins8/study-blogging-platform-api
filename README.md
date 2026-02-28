
> Desenvolvido para fins de estudo.
https://roadmap.sh/projects/blogging-platform-api
# Study Blogging Platform API

Esta aplicação é uma API de aprendizado para uma plataforma de blog, desenvolvida em Node.js com TypeScript.

## Pré-requisitos
- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Banco de dados SQLite (padrão) ou outro suportado

## Instalação
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd study-blogging-platform-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados
- O banco de dados padrão é SQLite, configurado em `src/db/index.ts`.
- Para rodar as migrações:
   ```bash
   npm run migrate
   ```
   (ou execute manualmente `npx tsx src/db/migrate.ts`)

## Executando a Aplicação
- Para rodar em modo desenvolvimento:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000` (ou porta configurada).

## Endpoints Principais
- `GET /posts` — Lista todos os posts
- `POST /posts` — Cria um novo post
- `GET /posts/:id` — Detalhes de um post
- `PUT /posts/:id` — Atualiza um post
- `DELETE /posts/:id` — Remove um post

## Testes
- Para rodar os testes:
   ```bash
   npm test
   ```

## Estrutura do Projeto
- `src/` — Código-fonte principal
  - `db/` — Configuração e migração do banco de dados
  - `modules/` — Lógica de posts (controllers, models, routes, schemas, services)
  - `utils/` — Utilitários gerais
- `tests/` — Testes automatizados

## Observações
- Edite as configurações do banco conforme necessário em `src/db/index.ts`.
---

