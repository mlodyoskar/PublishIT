export type CommentType = {
	id: string;
	created_at: string;
	updated_at: string;
	body: string;
	user: {
		id: string;
		fullName: string;
		username: string;
		avatarUrl: string;
	};
	article_id: number;
};
