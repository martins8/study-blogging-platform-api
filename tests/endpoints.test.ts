import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import type { PostsResponse } from "@/modules/posts.models.js";
import { postsRoutes } from "@/modules/posts.routes.js";

let server: FastifyInstance;
const BASE_URL = "http://localhost:3333";

beforeAll(async () => {
	server = Fastify();
	server.register(postsRoutes);
	// Registrar rota raiz manualmente, pois está no server.ts
	server.get("/", async (_request, reply) => {
		reply.send({
			message: "this is a project to learn and practice",
			endpoints: expect.any(Object),
		});
	});
	await server.listen({ port: 3333 });
});

afterAll(async () => {
	await server.close();
});

describe("GET / endpoint", () => {
	it("should be reachable and return a 200 status code", async () => {
		const response = await fetch(`${BASE_URL}/`);
		expect(response.status).toBe(200);
		const json = (await response.json()) as {
			message: string;
			endpoints: Record<string, unknown>;
		};
		expect(json.message).toBe("this is a project to learn and practice");
		expect(json.endpoints).toBeDefined();
	});
});

describe("POST /posts endpoint", () => {
	it("should create a new post and return the created post with a 201 status code", async () => {
		const newPost = {
			title: "Test Post",
			content: "This is a test post.",
			category: "Testing",
			tags: ["test", "post"],
		};
		const response = await fetch(`${BASE_URL}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		});
		expect(response.status).toBe(201);
		const responseData = (await response.json()) as PostsResponse;
		expect(responseData).toMatchObject({
			id: expect.any(String),
			title: newPost.title,
			content: newPost.content,
			category: newPost.category,
			tags: newPost.tags,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
	});
});

describe("PUT /posts/:id endpoint", () => {
	it("should update an existing post and return the updated post with a 200 status code", async () => {
		// First, create a new post to update
		const newPost = {
			title: "Post to Update",
			content: "This post will be updated.",
			category: "Testing",
			tags: ["update", "test"],
		};
		const createResponse = await fetch(`${BASE_URL}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		});
		expect(createResponse.status).toBe(201);
		const createdPost = (await createResponse.json()) as PostsResponse;
		// Now, update the created post
		const updatedPostData = {
			title: "Updated Post Title",
			content: "This post has been updated.",
			category: "Updated Testing",
			tags: ["updated", "test"],
		};
		const updateResponse = await fetch(`${BASE_URL}/posts/${createdPost.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedPostData),
		});
		expect(updateResponse.status).toBe(200);
		const updatedPost = (await updateResponse.json()) as PostsResponse;
		expect(updatedPost).toMatchObject({
			id: createdPost.id,
			title: updatedPostData.title,
			content: updatedPostData.content,
			category: updatedPostData.category,
			tags: updatedPostData.tags,
			createdAt: createdPost.createdAt,
			updatedAt: expect.any(String),
		});
	});
});

describe("DELETE /posts/:id endpoint", () => {
	it("should delete an existing post and return a 204 status code", async () => {
		// First, create a new post to delete
		const newPost = {
			title: "Post to Delete",
			content: "This post will be deleted.",
			category: "Testing",
			tags: ["delete", "test"],
		};
		const createResponse = await fetch(`${BASE_URL}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		});
		expect(createResponse.status).toBe(201);
		const createdPost = (await createResponse.json()) as PostsResponse;
		// Now, delete the created post
		const deleteResponse = await fetch(`${BASE_URL}/posts/${createdPost.id}`, {
			method: "DELETE",
		});
		expect(deleteResponse.status).toBe(204);
	});
	it("should return a 404 status code when trying to delete a non-existent post", async () => {
		const nonExistentPostId = "non-existent-id";
		const deleteResponse = await fetch(
			`${BASE_URL}/posts/${nonExistentPostId}`,
			{
				method: "DELETE",
			},
		);
		expect(deleteResponse.status).toBe(404);
		const responseData = await deleteResponse.json();
		expect(responseData).toEqual({ error: "Post not found." });
	});
});

describe("GET /posts/:id endpoint", () => {
	it("should return a 404 status code when trying to retrieve a non-existent post", async () => {
		const nonExistentPostId = "non-existent-id";
		const getResponse = await fetch(`${BASE_URL}/posts/${nonExistentPostId}`, {
			method: "GET",
		});
		expect(getResponse.status).toBe(404);
		const responseData = await getResponse.json();
		expect(responseData).toEqual({ error: "Post not found." });
	});

	it("should return a 200 status code when trying to retrieve an existing post", async () => {
		const getResponse = await fetch(`${BASE_URL}/posts/${1}`, {
			method: "GET",
		});
		expect(getResponse.status).toBe(200);
		const responseData = await getResponse.json();
		expect(responseData).toMatchObject({
			id: expect.any(String),
			title: expect.any(String),
			content: expect.any(String),
			category: expect.any(String),
			tags: expect.any(Array),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
	});
});

describe("GET /posts endpoint", () => {
	it("should return a 200 status code and an array of posts", async () => {
		const response = await fetch(`${BASE_URL}/posts`, {
			method: "GET",
		});
		expect(response.status).toBe(200);
		const responseData = await response.json();
		expect(Array.isArray(responseData)).toBe(true);
		if (responseData.length > 0) {
			expect(responseData[0]).toMatchObject({
				id: expect.any(String),
				title: expect.any(String),
				content: expect.any(String),
				category: expect.any(String),
				tags: expect.any(Array),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		}
	});
});
