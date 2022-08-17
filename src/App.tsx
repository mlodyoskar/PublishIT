import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { Home } from 'features/Home/views/Home';
import { Login } from 'features/Login/views/Login';
import { PageNotFound } from 'views/404';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigation } from 'components/Navigation/Navigation';
import { ArticlesRouter } from 'features/Article/views/ArticleRouter';
import { ToastContainer } from 'react-toastify';
import { UsersRouter } from 'features/User/views/UsersRouter';
import { queryClient } from 'utils/queryClient';
import { Bookmarks } from 'features/Home/views/Bookmarks';

const App = () => {
	const { user } = useAuth();
	const PrivateOutlet = () => {
		return user ? <Outlet /> : <Navigate to="/login" />;
	};

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{!user ? (
					<Login />
				) : (
					<>
						<Navigation />
						<Routes>
							<Route path="/" element={<PrivateOutlet />}>
								<Route path="/" element={<Home />} />
								<Route path="/articles/*" element={<ArticlesRouter />} />
								<Route path="/users/*" element={<UsersRouter />} />
								<Route path="/bookmarks" element={<Bookmarks />} />
								<Route path="*" element={<PageNotFound />} />
							</Route>
						</Routes>
					</>
				)}
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
			<ToastContainer />
		</QueryClientProvider>
	);
};

export default App;
