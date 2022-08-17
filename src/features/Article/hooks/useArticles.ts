import { SavedArticles } from 'types/SavedArticles';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';

interface Article extends ArticleType {
	user: UserType;
	isSaved: boolean;
}

const addIsSavedFlagToArticles = async (
	articles: Article[],
	userId: string
) => {
	const savedArticlesIds = (await getAllUserSavedArticles(userId)).map(
		({ article_id }) => article_id
	);

	const articlesWithSaved = articles.map((article) => {
		const isSaved = savedArticlesIds.includes(article.id);
		return {
			...article,
			isSaved,
		};
	});
	return articlesWithSaved;
};

export const getAllUserSavedArticles = async (userId: string) => {
	const { data: savedArticles, error } = await supabase
		.from<SavedArticles>('savedArticles')
		.select('article_id')
		.eq('user_id', userId);

	if (error) {
		throw new Error(error.message);
	}
	if (!savedArticles) {
		throw new Error('Articles not found');
	}

	return savedArticles;
};

const getAllArticles = async (userId: string) => {
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

	const articlesWithSaved = await addIsSavedFlagToArticles(articles, userId);

	console.log(articlesWithSaved);

	return articlesWithSaved;
};

const getUserArticles = async (userId: string, creatorId: string) => {
	const { data: articles, error } = await supabase
		.from<Article>('articles')
		.select('*, user:user_id(fullName)')
		.eq('user_id', creatorId)
		.order('created_at', { ascending: false });
	if (error) {
		throw new Error(error.message);
	}
	if (!articles) {
		throw new Error('Articles not found');
	}

	const articlesWithSaved = await addIsSavedFlagToArticles(articles, userId);
	return articlesWithSaved;
};

const useArticles = (
	userId: string | undefined,
	creatorId?: string | undefined
) => {
	if (!userId) {
		throw new Error('Couldnt get user');
	}
	if (creatorId) {
		return useQuery(['articles', creatorId], () =>
			getUserArticles(userId, creatorId)
		);
	} else {
		return useQuery('articles', () => getAllArticles(userId));
	}
};

export { useArticles };
