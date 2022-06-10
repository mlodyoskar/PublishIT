import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Form } from 'components/Form/Form';
import { LoginSignUp } from 'Layouts/LoginSignUp/LoginSignUp';

const Signup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <LoginSignUp>
        <Form isSignUp={true} />
      </LoginSignUp>
    </>
  );
};

export { Signup };
