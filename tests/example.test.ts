describe("GET / endpoint", () => {
	it("should be reachable and return a 200 status code", async () => {
		// Your test implementation here
		const response = await fetch("http://localhost:3000/");
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ message: "Hello, World!" });
	});
});
