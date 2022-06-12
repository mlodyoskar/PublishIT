import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { Form } from 'components/Form/Form';
import { LoginSignupTemplate } from 'templates/LoginSignupTemplate';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <LoginSignupTemplate>
        <Form isSignUp={false} />
      </LoginSignupTemplate>
    </>
  );
};

export { Login };
