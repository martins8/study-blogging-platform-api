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
