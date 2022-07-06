import { Input } from 'components/Input/Input';
import { useAuth } from 'contexts/AuthProvider';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsTwitter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Form = () => {
  const { signIn, signUp, signInWithTwitter } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const loginFormSchema = yup.object({
    email: yup.string().required().email().label('Email'),
    password: yup
      .string()
      .required()
      .min(6, 'Password is too short - should be 6 chars minimum')
      .label('Password'),
  });
  type FormFields = yup.InferType<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(loginFormSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { error } = isSignUp ? await signUp(data) : await signIn(data);

    if (error) {
      console.log(error);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start w-full mb-6">
        <h1 className="text-3xl font-semibold self-start mt-6">
          {isSignUp ? 'Sign up' : 'Login'}
        </h1>
        <p className="text-gray-400 self-start mb-6">
          Get access to all articles and interact!
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-6">
          <Input
            type="text"
            placeholder="mail@company.com"
            label="Email"
            errorMessage={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div className="flex flex-col mb-6">
          <Input
            label="Password"
            placeholder="min. 6 characters"
            type="password"
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </div>
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="rounded-sm mr-2 border-gray-300 text-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span>Remember me</span>
          </div>
          <a className="text-indigo-700">Forgot password</a>
        </div>
        <button className="w-full bg-indigo-500 p-2 rounded-md text-white mb-3 hover:bg-indigo-700">
          {isSignUp ? 'Sign up' : 'Sign in'}
        </button>
        <button
          type="button"
          onClick={signInWithTwitter}
          className="w-full border border-gray-300 flex items-center justify-center text-gray-900 p-2 rounded-md mb-4 hover:bg-gray-50"
        >
          <BsTwitter size="1.4rem" className="text-[#1DA1F2] mr-4" /> Sign in
          with Twitter
        </button>
        <p className="text-sm text-gray-400 text-center">
          {isSignUp ? 'Already have an account?' : "You don't have an account?"}{' '}
          <button
            type="button"
            className="text-indigo-500 font-semibold hover:text-indigo-700"
            onClick={() => setIsSignUp((prevValue) => !prevValue)}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </form>
    </>
  );
};

export { Form };
