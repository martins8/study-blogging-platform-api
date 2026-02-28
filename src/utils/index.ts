import type { Row } from "@libsql/client";
import type { FastifyInstance } from "fastify";
import type { PostsResponse } from "@/modules/posts.models.js";

export function loginfo(server: FastifyInstance) {
	const address = server.server.address();
	const port = typeof address === "string" ? address : address?.port;
	server.log.info(`Server is running on port ${port}`);
	server.log.info(`devUrl: http://localhost:${port} 🌐`);
	console.log(`Server is running on port ${port}`);
	console.log(`devUrl: http://localhost:${port} 🌐`);
}

export function rowToPost(row: Row): PostsResponse {
	return {
		id: String(row.id),
		title: String(row.title),
		content: String(row.content),
		category: String(row.category),
		tags: JSON.parse(String(row.tags)),
		createdAt: String(row.created_at),
		updatedAt: String(row.updated_at),
	};
}
