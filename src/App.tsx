import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from 'views/Home';
import { Login } from 'views/Login';
import { PageNotFound } from 'views/404';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigation } from 'components/Navigation/Navigation';
import { ArticlesRouter } from 'views/Articles/ArticleRouter';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { user } = useAuth();
  const PrivateOutlet = () => {
    return user ? <Outlet /> : <Navigate to="/login" />;
  };

  const queryClient = new QueryClient();

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
