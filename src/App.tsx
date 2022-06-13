import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthProvider';
import { Home } from 'views/Home';
import { Login } from 'views/Login';
import { Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

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
          <Routes>
            <Route path="/" element={<PrivateOutlet />}>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<Home />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
