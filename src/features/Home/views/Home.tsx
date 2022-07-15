import { PageTemplate } from 'templates/PageTemplate';
import { ArticleList } from 'components/ArticleList/ArticleList';
import { useArticles } from 'features/Article/hooks/useArticles';
import { LoaderSpinner } from 'components/Spinner/Spinner';

const Home = () => {
	const { data: articles, status } = useArticles();
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
			<div className="mx-4 md:m-0">
				<h1 className="text-3xl mb-4">All articles 🗞️</h1>
				<ArticleList articles={articles} />
			</div>
		</PageTemplate>
	);
};

export { Home };
