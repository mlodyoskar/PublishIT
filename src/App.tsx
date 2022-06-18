import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from 'views/Home';
import { Login } from 'views/Login';
import { Article } from 'views/Article';
import { PageNotFound } from 'views/404';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigation } from 'components/Navigation/Navigation';

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
                <Route path="/articles/new" element={<Article />} />
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/:id/edit" element={<Article />} />
                <Route path="/users/:username" element={<Article />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </>
        )}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
