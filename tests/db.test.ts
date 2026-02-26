import client from "@/db/index.js";

describe("Database connection", () => {
	it("should connect to the database successfully", async () => {
		const result = await client.execute("SELECT 1");
		expect(result).toBeDefined();
		expect(result.rows).toBeDefined();
		expect(result.rows.length).toBe(1);
		expect(result.rows[0][0]).toBe(1);
	});

	it("should be TABLE posts exists", async () => {
		const result = await client.execute(
			"SELECT name FROM sqlite_master WHERE type='table' AND name='posts'",
		);
		expect(result).toBeDefined();
		expect(result.rows).toBeDefined();
		expect(result.rows.length).toBe(1);
		expect(result.rows[0][0]).toBe("posts");
	});

	it("should be able to create a post", async () => {
		const title = "Test Post";
		const content = "This is a test post.";
		const category = "Testing";
		const tags = JSON.stringify(["test", "post"]);
		const createdAt = new Date().toISOString();
		const updatedAt = new Date().toISOString();

		await client.execute(
			"INSERT INTO posts (title, content, category, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
			[title, content, category, tags, createdAt, updatedAt],
		);

		const result = await client.execute("SELECT * FROM posts WHERE title = ?", [
			title,
		]);
		expect(result).toBeDefined();
		expect(result.rows).toBeDefined();
		expect(result.rows.length).toBeGreaterThan(0);
		expect(result.rows[0][1]).toBe(title);
		expect(result.rows[0][2]).toBe(content);
		expect(result.rows[0][3]).toBe(category);
		expect(result.rows[0][4]).toBe(tags);
		expect(result.rows[0][5]).toBeDefined();
		expect(result.rows[0][6]).toBeDefined();
	});
});
