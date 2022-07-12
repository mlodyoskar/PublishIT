import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { LoginSignupTemplate } from 'templates/LoginSignupTemplate';
import { SignupForm } from 'components/SignupForm/SignUpForm';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSetIsLoginClick = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <>
      <LoginSignupTemplate>
        {isLogin ? (
          <LoginForm handleSetIsLoginClick={handleSetIsLoginClick} />
        ) : (
          <SignupForm handleSetIsLoginClick={handleSetIsLoginClick} />
        )}
      </LoginSignupTemplate>
    </>
  );
};

export { Login };
