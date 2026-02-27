/*```
A estrutura correta é:
schema
├── body        → descreve o que entra
│   ├── properties
│   ├── required
│   └── additionalProperties
└── response    → descreve o que sai
    └── 201
```*/

export const postPostsSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				title: { type: "string" },
				content: { type: "string" },
				category: { type: "string" },
				tags: {
					type: "array",
					items: { type: "string" },
				},
			},
			required: ["title", "content", "category", "tags"], // ✅ irmão de properties
			additionalProperties: false,
		},
		response: {
			// ✅ irmão de body, não filho
			201: {
				type: "object",
				properties: {
					id: { type: "string" },
					title: { type: "string" },
					content: { type: "string" },
					category: { type: "string" },
					tags: {
						type: "array",
						items: { type: "string" },
					},
					createdAt: { type: "string" },
					updatedAt: { type: "string" },
				},
			},
		},
	},
};

export const putPostsSchema = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
			required: ["id"],
			additionalProperties: false,
		},
		body: {
			type: "object",
			properties: {
				title: { type: "string" },
				content: { type: "string" },
				category: { type: "string" },
				tags: {
					type: "array",
					items: { type: "string" },
				},
			},
			required: ["title", "content", "category", "tags"],
			additionalProperties: false,
		},
		response: {
			200: {
				type: "object",
				properties: {
					id: { type: "string" },
					title: { type: "string" },
					content: { type: "string" },
					category: { type: "string" },
					tags: {
						type: "array",
						items: { type: "string" },
					},
					createdAt: { type: "string" },
					updatedAt: { type: "string" },
				},
			},
		},
	},
};

export const deletePostSchema = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
			required: ["id"],
			additionalProperties: false,
		},
		response: {
			204: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			404: {
				type: "object",
				properties: {
					error: { type: "string" },
				},
			},
		},
	},
};
