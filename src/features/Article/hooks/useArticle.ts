import { useAuth } from 'contexts/AuthProvider';
import { SavedArticles } from './../../../types/SavedArticles';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';

interface ArticleDetails extends ArticleType {
	user: UserType;
}

export const getIfArticleIsSaved = async (
	articleId: string,
	userId: string
) => {
	const { data: savedArticle, error } = await supabase
		.from<SavedArticles>('savedArticles')
		.select('id')
		.match({ article_id: articleId, user_id: userId });

	if (error) {
		throw new Error(error.message);
	}
	if (!savedArticle) {
		throw new Error('Articles not found');
	}
	return savedArticle.length >= 1;
};

const getArticle = async (id: string) => {
	const { data: articles, error } = await supabase
		.from<ArticleDetails>('articles')
		.select('*, user:user_id(id, fullName,username, avatarUrl)')
		.eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
	if (!articles) {
		throw new Error('Articles not found');
	}
	return articles[0];
};

const useArticle = (id: string | undefined) => {
	const { user } = useAuth();
	if (!id || !user) return;
	return useQuery(['articles', id], async () => {
		const isArticleSaved = await getIfArticleIsSaved(id, user.id);
		const article = await getArticle(id);
		return { ...article, isArticleSaved };
	});
};

export { useArticle };
