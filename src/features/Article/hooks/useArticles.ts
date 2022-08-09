import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';

interface Article extends ArticleType {
	user: UserType;
}

const getAllArticles = async () => {
	const { data: articles, error } = await supabase
		.from<Article>('articles')
		.select('*, user:user_id(fullName, username)')
		.order('created_at', { ascending: false })
		.eq('published', true);

	if (error) {
		throw new Error(error.message);
	}
	if (!articles) {
		throw new Error('Articles not found');
	}
	return articles;
};

const getUserArticles = async (id: string) => {
	const { data: articles, error } = await supabase
		.from<Article>('articles')
		.select('*, user:user_id(fullName)')
		.eq('user_id', id)
		.order('created_at', { ascending: false });
	if (error) {
		throw new Error(error.message);
	}
	if (!articles) {
		throw new Error('Articles not found');
	}
	return articles;
};

const useArticles = (id?: string | undefined) => {
	if (id) {
		return useQuery(['articles', id], () => getUserArticles(id));
	} else {
		return useQuery('articles', () => getAllArticles());
	}
};

export { useArticles };
