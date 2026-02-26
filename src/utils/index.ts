import type { FastifyInstance } from "fastify";

export function loginfo(server: FastifyInstance) {
	const address = server.server.address();
	const port = typeof address === "string" ? address : address?.port;
	server.log.info(`Server is running on port ${port}`);
	server.log.info(`devUrl: http://localhost:${port} 🌐`);
	console.log(`Server is running on port ${port}`);
	console.log(`devUrl: http://localhost:${port} 🌐`);
}
