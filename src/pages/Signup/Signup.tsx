import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/Input/Input';

const Signup = () => {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await signUp(data);
    if (error) {
      alert('error signing in');
      console.log(error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="shadow-md rounded-md flex flex-col bg-gray-50 place-content-center w-96 p-6 m-auto h-max">
      <h1 className="text-2xl text-indigo-600">Create new account</h1>
      <p className="mb-4 text-sm">
        You have existing account?{' '}
        <Link to="/login" className="text-indigo-600">
          Log in
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <Input type="email" {...register('email')}>
            Email
          </Input>
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex flex-col mb-4">
          <Input type="email" {...register('password')}>
            Password
          </Input>

          {errors.password && <span>This field is required</span>}
        </div>
        <button className="bg-indigo-700 p-2 rounded-md text-white">
          Sign up
        </button>
      </form>
    </div>
  );
};

export { Signup };
