import type { FastifyReply, FastifyRequest } from "fastify";
import type { PostsRequestBody } from "./posts.models.js";
import {
	createPostService,
	deletePostService,
	getPostByIdService,
	updatePostService,
} from "./posts.services.js";

export async function createPostController(
	request: FastifyRequest<{ Body: PostsRequestBody }>,
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

export async function putPostController(
	request: FastifyRequest<{
		Body: PostsRequestBody;
		Params: { id: string };
	}>,
	reply: FastifyReply,
) {
	try {
		const { id } = request.params;
		const { title, content, category, tags } = request.body;
		const result = await updatePostService(id, {
			title,
			content,
			category,
			tags,
		});
		console.log("Post updated successfully:", result);
		reply.status(200).send(result);
	} catch (error) {
		console.log("Error in putPostController:", error);
		reply
			.status(500)
			.send({ error: "An error occurred while updating the post." });
		return;
	}
}

export async function deletePostController(
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) {
	try {
		const { id } = request.params;
		const result = await deletePostService(id);

		if (!result) {
			console.log("Post not found for deletion:", id);
			reply.status(404).send({ error: "Post not found." });
			return;
		}

		console.log("Post deleted successfully:", id);
		reply.status(204).send({ message: "No Content" });
	} catch (error) {
		console.log("Error in deletePostController:", error);
		reply
			.status(500)
			.send({ error: "An error occurred while deleting the post." });
		return;
	}
}

export async function getPostByIdController(
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) {
	try {
		const { id } = request.params;
		const result = await getPostByIdService(id);

		if (!result) {
			console.log("Post not found:", id);
			reply.status(404).send({ error: "Post not found." });
			return;
		}

		console.log("Post retrieved successfully:", result);
		reply.status(200).send(result);
	} catch (error) {
		console.log("Error in getPostController:", error);
		reply
			.status(500)
			.send({ error: "An error occurred while retrieving the post." });
		return;
	}
}
