import { PageTemplate } from 'templates/PageTemplate';
import { ArticleList } from 'components/ArticleList/ArticleList';
import { useArticles } from 'features/Article/hooks/useArticles';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { AddArticleButton } from 'features/Home/components/AddArticleButton/AddArticleButton';
import { useScrollPosition } from 'features/Article/hooks/useScrollPosition';

const Home = () => {
	const { data: articles, status } = useArticles();
	const scrollFromTop = useScrollPosition();
	const addArticleButtonVisible = scrollFromTop < 60;

	if (status === 'loading') {
		return (
			<PageTemplate>
				<LoaderSpinner />
			</PageTemplate>
		);
	}

	if (!articles) {
		return (
			<PageTemplate>
				<h2>Articles wasnt found</h2>
			</PageTemplate>
		);
	}

	return (
		<PageTemplate>
			<div className="md:m-0">
				<h1 className="mb-4 text-3xl">All articles 🗞️</h1>
				<ArticleList articles={articles} />
			</div>
			<AddArticleButton visible={addArticleButtonVisible} />
		</PageTemplate>
	);
};

export { Home };
