import { Route, Routes } from 'react-router';
import { ArticleCreation } from './ArticleCreation';
import { ArticleDetails } from './ArticleDetails';
import { ArticleEdition } from './ArticleEdition';
import { ArticleListing } from './ArticleListing';

const ArticlesRouter = () => (
	<Routes>
		<Route path="/" element={<ArticleListing />} />
		<Route path="/new/*" element={<ArticleCreation />} />
		<Route path="/:id" element={<ArticleDetails />} />
		<Route path="/:id/edit/*" element={<ArticleEdition />} />
	</Routes>
);

export { ArticlesRouter };
