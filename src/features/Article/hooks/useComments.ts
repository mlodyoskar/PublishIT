import { Comment } from 'features/Article/components/Comment/Comment';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

const getAllArticleComments = async (id: string) => {
	const { data: comments, error } = await supabase
		.from<Comment>('comments')
		.select(
			'id, article_id, created_at, body, user:user_id(id, fullName, username, avatarUrl)'
		)
		.eq('article_id', id)
		.order('created_at', { ascending: false });

	if (error) {
		throw new Error(error.message);
	}
	if (!comments) {
		throw new Error('Comments not found');
	}
	return comments;
};

const useComments = (id: string | undefined) => {
	if (id === undefined) throw new Error("Article id wasn't passed");
	return useQuery(['comments', id], () => getAllArticleComments(id));
};

export { useComments };
