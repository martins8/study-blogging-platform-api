import client from "./index.js";

export async function dropTables() {
	await client.execute("DROP TABLE IF EXISTS posts");
}

export async function createTables() {
	await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
}

// execute migration if this file is run directly
if (process.argv[1].endsWith("migrate.ts")) {
	await dropTables();
	await createTables();
	console.log("Tables recreated.");
	process.exit(0);
}
