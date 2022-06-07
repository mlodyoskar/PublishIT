import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputAndLabel } from '../../components/Input/Input';

const Login = () => {
  const { user, signIn } = useAuth();
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
    const { error } = await signIn(data);
    console.log(data);

    if (error) {
      alert('error signing in');
      console.log(error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="shadow-md rounded-md flex flex-col bg-gray-50 place-content-center w-96 p-6 m-auto h-max">
      <h1 className="text-2xl text-indigo-600">Login to your account</h1>
      <p className="mb-4 text-sm">
        You dont have account?{' '}
        <Link to="/signup" className="text-indigo-600">
          Sign up
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <InputAndLabel {...register('email')}>Email</InputAndLabel>
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex flex-col mb-4">
          <InputAndLabel {...register('password')}>Password</InputAndLabel>
          {errors.password && <span>This field is required</span>}
        </div>
        <button className="bg-indigo-700 p-2 rounded-md text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export { Login };
