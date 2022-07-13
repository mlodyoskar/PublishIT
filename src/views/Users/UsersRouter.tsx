import { Route, Routes } from 'react-router';
import { PageNotFound } from 'views/404';
import { UserDetails } from './UserDetails';

const UsersRouter = () => (
  <Routes>
    <Route path="/" element={<PageNotFound />} />
    <Route path="/:id" element={<UserDetails />} />
  </Routes>
);

export { UsersRouter };
