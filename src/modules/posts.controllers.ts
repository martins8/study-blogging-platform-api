import type { FastifyReply, FastifyRequest } from "fastify";
import type { PostPostsRequestBody } from "./posts.models.js";
import { createPostService } from "./posts.services.js";

export async function createPostController(
	request: FastifyRequest<{ Body: PostPostsRequestBody }>,
	reply: FastifyReply,
) {
	try {
		const { title, content, category, tags } = request.body;
		const result = await createPostService({
			title,
			content,
			category,
			tags,
		});
		console.log("Post created successfully:", result);
		reply.status(201).send(result);
	} catch (error) {
		console.log("Error in createPostController:", error);
		reply
			.status(500)
			.send({ error: "An error occurred while creating the post." });
		return;
	}
}
