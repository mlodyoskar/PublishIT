import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { BsTwitter } from 'react-icons/bs';

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

    if (error) {
      alert('error signing in');
      console.log(error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="shadow-md rounded-md border-gray-500 flex flex-col justify-center w-96 p-6 m-auto h-max">
      <h1 className="text-2xl text-indigo-600">Login to your account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          >
            Email address
          </Input>
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex flex-col mb-4">
          <Input
            placeholder="Enter your password"
            type="password"
            {...register('password')}
          >
            Password
          </Input>
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded-sm mr-2 border-gray-300 text-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span>Remember me</span>
          </div>
          <a className="text-indigo-700">Forgot password</a>
        </div>
        <button className="w-full bg-indigo-700 p-2 rounded-md text-white mb-4 hover:bg-indigo-800">
          Sign in
        </button>
        <button className="w-full border border-gray-300 flex items-center justify-center text-gray-900 p-2 rounded-md mb-4 hover:bg-gray-50">
          <BsTwitter size="1.4rem" className="text-[#1DA1F2] mr-4" /> Sign in
          with Twitter
        </button>
        <p className="text-sm text-gray-400 text-center">
          {"Don't have an account?"}{' '}
          <Link
            className="text-indigo-500 font-semibold hover:text-indigo-700"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export { Login };
