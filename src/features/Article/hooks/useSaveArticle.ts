import { useAuth } from 'contexts/AuthProvider';
import { useQuery, useMutation } from 'react-query';
import { supabase } from 'supabase';
import { SavedArticles } from 'types/SavedArticles';

const saveArticle = async (articleId: string, userId: string) => {
	const { error } = await supabase
		.from<SavedArticles>('savedArticles')
		.insert({ article_id: articleId, user_id: userId });

	if (error) {
		throw new Error(error.message);
	}
};

const useSaveArticle = () => {
	return useMutation((savedArticleData: SavedArticles) =>
		saveArticle(savedArticleData.article_id, savedArticleData.user_id)
	);
};

export { useSaveArticle };
