import type { FastifyInstance, RouteHandler } from "fastify";
import {
	createPostController,
	putPostController,
} from "./posts.controllers.js";
import { postPostsSchema, putPostsSchema } from "./posts.schemas.js";

export async function postsRoutes(server: FastifyInstance) {
	server.post("/posts", postPostsSchema, createPostController as RouteHandler);
	server.put("/posts/:id", putPostsSchema, putPostController as RouteHandler);
}
