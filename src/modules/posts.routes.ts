import type { FastifyInstance, RouteHandler } from "fastify";
import {
	createPostController,
	deletePostController,
	getPostByIdController,
	putPostController,
} from "./posts.controllers.js";
import {
	deletePostSchema,
	getPostByIdSchema,
	postPostsSchema,
	putPostsSchema,
} from "./posts.schemas.js";

export async function postsRoutes(server: FastifyInstance) {
	server.post("/posts", postPostsSchema, createPostController as RouteHandler);

	server.put("/posts/:id", putPostsSchema, putPostController as RouteHandler);

	server.delete(
		"/posts/:id",
		deletePostSchema,
		deletePostController as RouteHandler,
	);

	server.get(
		"/posts/:id",
		getPostByIdSchema,
		getPostByIdController as RouteHandler,
	);
}
