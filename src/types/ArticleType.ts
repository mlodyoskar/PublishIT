import { UserType } from './UserType';

export type ArticleType = {
	id: number;
	created_at: string;
	updatet_at: string;
	title: string;
	body: string;
	slug: string;
	user_id: string;
	user: UserType;
	imageUrl: string;
	published: boolean;
};
