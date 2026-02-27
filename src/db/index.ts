import { createClient } from "@libsql/client";

const isTest = process.env.NODE_ENV === "test";
console.log(
	`Initializing database client in ${isTest ? "test" : "development"} mode...`,
);
const client = createClient({
	url: isTest ? "file:./test.db" : "file:./dev.db",
});

await client.execute("PRAGMA busy_timeout = 2000");

export default client;
