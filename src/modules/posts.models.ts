export interface PostsRequestBody {
	title: string;
	content: string;
	category: string;
	tags: string[];
}

export interface PostsResponse {
	id: string;
	title: string;
	content: string;
	category: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
}
