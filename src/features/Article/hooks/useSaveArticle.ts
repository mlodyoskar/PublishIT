import { queryClient } from 'utils/queryClient';
import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { SavedArticles } from 'types/SavedArticles';
import { getIfArticleIsSaved } from './useArticle';

type InsertSavedPost = Pick<SavedArticles, 'article_id' | 'user_id'>;

const saveArticle = async (articleId: string, userId: string) => {
	const isArticleSaved = await getIfArticleIsSaved(articleId, userId);
	if (!isArticleSaved) {
		const { error } = await supabase
			.from<SavedArticles>('savedArticles')
			.insert({ article_id: articleId, user_id: userId });

		if (error) {
			throw new Error(error.message);
		}
	} else {
		const { error } = await supabase
			.from<SavedArticles>('savedArticles')
			.delete()
			.match({ article_id: articleId, user_id: userId });

		if (error) {
			throw new Error(error.message);
		}
	}
};

const useSaveArticle = () => {
	return useMutation(
		({ article_id, user_id }: InsertSavedPost) =>
			saveArticle(article_id, user_id),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['articles']);
			},
		}
	);
};

export { useSaveArticle };
