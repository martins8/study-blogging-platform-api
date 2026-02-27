import type { PostsResponse } from "@/modules/posts.models.js";

describe("GET / endpoint", () => {
	it("should be reachable and return a 200 status code", async () => {
		// Your test implementation here
		const response = await fetch("http://localhost:3000/");
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			message: "this is a project to learn and practice",
			endpoints: expect.any(Object),
		});
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

		const response = await fetch("http://localhost:3000/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		});

		expect(response.status).toBe(201);
		const responseData = await response.json();
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

		const createResponse = await fetch("http://localhost:3000/posts", {
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

		const updateResponse = await fetch(
			`http://localhost:3000/posts/${createdPost.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedPostData),
			},
		);
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
