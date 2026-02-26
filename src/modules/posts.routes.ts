import type { FastifyInstance, RouteHandler } from "fastify";
import { createPostController } from "./posts.controller.js";
import { postPostsSchema } from "./posts.schemas.js";

export async function postsRoutes(server: FastifyInstance) {
	server.post("/posts", postPostsSchema, createPostController as RouteHandler);
}
