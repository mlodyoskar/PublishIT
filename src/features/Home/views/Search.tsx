import { ArticleList } from 'components/ArticleList/ArticleList';
import { Header } from 'components/Header/Header';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useArticle } from 'features/Article/hooks/useArticle';
import { useArticles } from 'features/Article/hooks/useArticles';
import { useSavedArticles } from 'features/Article/hooks/useSavedArticle';
import { useSearch } from 'hooks/api/useSearch';
import { useParams, useSearchParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';

export const Search = () => {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('q');

	const { data, status } = useSearch(searchQuery);
	console.log(data);
	if (status === 'loading') {
		return (
			<PageTemplate>
				<LoaderSpinner />
			</PageTemplate>
		);
	}

	if (!data) {
		return (
			<PageTemplate>
				<Header>Could not fetch results</Header>
			</PageTemplate>
		);
	}
	return (
		<PageTemplate>
			<Header>Search results 🔍</Header>
			{data.length === 0 && <p>No results found</p>}
			<ArticleList articles={data} />
		</PageTemplate>
	);
};
