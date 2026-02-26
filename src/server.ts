import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { postsRoutes } from "./posts.routes.js";
import { loginfo } from "./utils/index.js";

const server: FastifyInstance = Fastify({});

server.get("/", async (_request, reply) => {
	reply.send({
		message: "this is a project to learn and practice",
		endpoints: {
			"GET /": "Returns a welcome message and a list of available endpoints.",
			"POST /posts":
				"Creates a new post with the provided data and returns the created post.",
			"PUT /posts/:id":
				"Updates an existing post with the provided data and returns the updated post.",
			"DELETE /posts/:id":
				"Deletes an existing post and returns a success message.",
			"GET /posts/:id": "Returns a specific post by its ID.",
			"GET /posts": "Returns a list of all posts.",
			"GET /posts?term=searchTerm":
				"Returns a list of posts that match the search term in the title or content.",
		},
	});
});

await server.register(postsRoutes);

const start = async () => {
	try {
		await server.listen({ port: 3000 });
		loginfo(server);
	} catch (error) {
		server.log.error(error);
		process.exit(1);
	}
};

start();
