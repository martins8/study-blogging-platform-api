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
