import { Route, Routes } from 'react-router';
import { PageNotFound } from 'views/404';
import { UserDetails } from './UserDetails';
import { UserEdition } from './UserEdition';

const UsersRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<PageNotFound />} />
			<Route path="/:id" element={<UserDetails />} />
			<Route path="/:id/edit" element={<UserEdition />} />
		</Routes>
	);
};

export { UsersRouter };
