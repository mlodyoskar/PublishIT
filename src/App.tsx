import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthProvider';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Login } from './pages/Login/Login';
import { Signup } from './pages/Signup/Signup';
import { Navigate } from 'react-router-dom';
import { LoginSignUp } from 'Layouts/LoginSignUp/LoginSignUp';

const App = () => {
  const PrivateOutlet = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
