> Developed for study purposes.
https://roadmap.sh/projects/blogging-platform-api

# Study Blogging Platform API

This application is an API for a blogging platform, built with Node.js and TypeScript.

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- SQLite database (default) or another supported database

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd study-blogging-platform-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Database Setup
- The default database is SQLite, configured in `src/db/index.ts`.
- To run migrations:
   ```bash
   npm run migrate
   ```
   (or run manually: `npx tsx src/db/migrate.ts`)

## Running the Application
- To start in development mode:
   ```bash
   npm run dev
   ```
The API will be available at `http://localhost:3000` (or the configured port).

## Main Endpoints
- `GET /posts` — List all posts
- `POST /posts` — Create a new post
- `GET /posts/:id` — Get post details
- `PUT /posts/:id` — Update a post
- `DELETE /posts/:id` — Delete a post

## Testing
- To run tests:
   ```bash
   npm test
   ```

## Project Structure
- `src/` — Main source code
  - `db/` — Database configuration and migration
  - `modules/` — Posts logic (controllers, models, routes, schemas, services)
  - `utils/` — General utilities
- `tests/` — Automated tests

## Notes
- Edit the database configuration as needed in `src/db/index.ts`.
- Feel free to contribute!

---


