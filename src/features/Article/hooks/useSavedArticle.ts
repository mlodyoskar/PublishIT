import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';
import { getAllUserSavedArticles } from './useArticles';

export interface Article extends ArticleType {
	user: UserType;
	isSaved: boolean;
}

interface SavedArticles {
	user_id: string;
	article: Article;
}

export const getSavedArticles = async (userId: string) => {
	const { data: savedArticles, error } = await supabase
		.from<SavedArticles>('savedArticles')
		.select(
			'article:article_id(id, slug, body, imageUrl, title, created_at, user:user_id(id, username, fullName, avatarUrl))'
		)
		.eq('user_id', userId);
	if (error) {
		throw new Error(error.message);
	}
	if (!savedArticles) {
		throw new Error('Articles not found');
	}

	const newSavedArticles = savedArticles.map((savedArticle) => ({
		...savedArticle.article,
	}));

	const savedArticlesIds = (await getAllUserSavedArticles(userId)).map(
		({ article_id }) => article_id
	);

	const articlesWithSaved = newSavedArticles.map((article) => {
		const isSaved = savedArticlesIds.includes(article.id);
		return {
			...article,
			isSaved,
		};
	});

	return articlesWithSaved;
};

const useSavedArticles = () => {
	const user = useLoggedInUser();

	return useQuery('savedArticles', async () => getSavedArticles(user.id));
};

export { useSavedArticles };
