import type { Row } from "@libsql/client/web";
import client from "@/db/index.js";
import type {
	PostPostsRequestBody,
	PostPostsResponse,
} from "./posts.models.js";

export function rowToPost(row: Row): PostPostsResponse {
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

export async function createPostService(
	post: PostPostsRequestBody,
): Promise<PostPostsResponse> {
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
		return response as PostPostsResponse;
	} catch (error) {
		console.log("Error in createPostService:", error);
		throw new Error("An error occurred while creating the post.");
	}
}
