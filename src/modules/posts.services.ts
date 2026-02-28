import client from "@/db/index.js";
import { rowToPost } from "@/utils/index.js";
import type { PostsRequestBody, PostsResponse } from "./posts.models.js";

export async function createPostService(
	post: PostsRequestBody,
): Promise<PostsResponse> {
	const { title, content, category, tags } = post;
	const [createdAt, updatedAt] = [
		new Date().toLocaleDateString("en-CA"), // "YYYY-MM-DD"
		new Date().toLocaleDateString("en-CA"), // "YYYY-MM-DD"
	];
	try {
		const result = await client.execute({
			sql: "INSERT INTO posts (title, content, category, tags, created_at, updated_at) VALUES (?, ?, ?, json(?), ?, ?) RETURNING *",
			args: [
				title,
				content,
				category,
				JSON.stringify(tags),
				createdAt,
				updatedAt,
			],
		});
		const response = rowToPost(result.rows[0]);
		return response as PostsResponse;
	} catch (error) {
		console.log("Error in createPostService:", error);
		throw new Error("An error occurred while creating the post.");
	}
}

export async function updatePostService(
	id: string,
	post: PostsRequestBody,
): Promise<PostsResponse> {
	const { title, content, category, tags } = post;
	const updatedAt = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD"
	try {
		const result = await client.execute({
			sql: "UPDATE posts SET title = ?, content = ?, category = ?, tags = json(?), updated_at = ? WHERE id = ? RETURNING *",
			args: [title, content, category, JSON.stringify(tags), updatedAt, id],
		});
		const response = rowToPost(result.rows[0]);
		return response as PostsResponse;
	} catch (error) {
		console.log("Error in updatePostService:", error);
		throw new Error("An error occurred while updating the post.");
	}
}

export async function deletePostService(id: string): Promise<boolean> {
	try {
		const result = await client.execute({
			sql: "DELETE FROM posts WHERE id = ? RETURNING id",
			args: [id],
		});
		if (result.rows.length === 0) {
			return false;
		}
		return true;
	} catch (error) {
		console.log("Error in deletePostService:", error);
		throw new Error("An error occurred while deleting the post.");
	}
}

export async function getPostByIdService(
	id: string,
): Promise<PostsResponse | null> {
	try {
		const result = await client.execute({
			sql: "SELECT * FROM posts WHERE id = ?",
			args: [id],
		});
		if (result.rows.length === 0) {
			return null;
		}
		const response = rowToPost(result.rows[0]);
		return response as PostsResponse;
	} catch (error) {
		console.log("Error in getPostByIdService:", error);
		throw new Error("An error occurred while retrieving the post.");
	}
}

export async function getAllPostsService(): Promise<PostsResponse[]> {
	try {
		const result = await client.execute({
			sql: "SELECT * FROM posts",
		});
		const response = result.rows.map(rowToPost);
		return response as PostsResponse[];
	} catch (error) {
		console.log("Error in getAllPostsService:", error);
		throw new Error("An error occurred while retrieving the posts.");
	}
}
