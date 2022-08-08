import { ArticleType } from './../../types/ArticleType';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

type searchArticle = Pick<ArticleType, 'id' | 'imageUrl' | 'title'>;

const searchArticles = async (query: string) => {
	if (query !== '') {
		const { data: articles, error } = await supabase
			.from<searchArticle>('articles')
			.select('id, imageUrl, title')
			.ilike('title', `%${query.toLowerCase()}%`);

		if (error) {
			throw new Error(error.message);
		}

		return articles;
	}
	return [];
};

const useSearch = (query: string) => {
	return useQuery(['search', query], () => searchArticles(query));
};

export { useSearch };
