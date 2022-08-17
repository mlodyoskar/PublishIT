import { useAuth } from 'contexts/AuthProvider';
import { addIsSavedFlagToArticles } from './../../features/Article/hooks/useArticles';
import { Article } from './../../features/Article/hooks/useSavedArticle';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

const searchArticles = async (query: string, userId: string) => {
	if (query !== '') {
		const { data: articles, error } = await supabase
			.from<Article>('articles')
			.select(
				'id, title, slug, created_at, imageUrl, user:user_id(id, fullName, username, avatarUrl)'
			)
			.ilike('title', `%${query.toLowerCase()}%`);

		if (error) {
			throw new Error(error.message);
		}

		const articlesWithIsSaved = await addIsSavedFlagToArticles(articles, userId);

		return articlesWithIsSaved;
	}
	return [];
};

const useSearch = (query: string | null) => {
	const { user } = useAuth();
	if (!query || !user) {
		throw new Error('Search query was not provided');
	}
	return useQuery(['search', query], () => searchArticles(query, user.id));
};

export { useSearch };
