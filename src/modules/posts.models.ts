export interface PostPostsRequestBody {
	title: string;
	content: string;
	category: string;
	tags: string[];
}

export interface PostPostsResponse {
	id: string;
	title: string;
	content: string;
	category: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
}
