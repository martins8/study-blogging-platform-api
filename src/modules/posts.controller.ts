import type { FastifyReply, FastifyRequest } from "fastify";
import type { PostPostsRequestBody } from "./posts.models.js";

export async function createPostController(
	request: FastifyRequest<{ Body: PostPostsRequestBody }>,
	reply: FastifyReply,
) {
	try {
		const { title, content, category, tags } = request.body;
		reply.status(201).send("Post created successfully");
	} catch (error) {
		console.log("Error in createPostController:", error);
		reply
			.status(500)
			.send({ error: "An error occurred while creating the post." });
		return;
	}
}
