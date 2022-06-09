import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'components/Input/Input';
import { BsTwitter, BsFillLightningChargeFill } from 'react-icons/bs';
import { MdArticle, MdReviews, MdCreate } from 'react-icons/md';
import Logo from 'assets/img/articles.svg';

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
    <div className="h-screen flex">
      <div className="flex flex-col justify-center items-center w-full md:w-2/4 p-6 m-auto h-full">
        <div className=" mb-6  justify-start w-4/5 ">
          <BsFillLightningChargeFill size="3rem" className="text-indigo-500" />
        </div>
        <div className=" flex flex-col items-center justify-center w-full md:w-4/5 max-w-md h-4/5">
          <div className="flex flex-col justify-start w-full mb-6">
            <h1 className="text-3xl font-semibold self-start mt-6">Login</h1>
            <p className="text-gray-400 self-start mb-6">
              Get access to all articles and interact!
            </p>
          </div>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-6">
              <Input
                type="email"
                placeholder="mail@company.com"
                {...register('email')}
              >
                Email address
              </Input>
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="flex flex-col mb-6">
              <Input
                placeholder="min. 6 characters"
                type="password"
                {...register('password')}
              >
                Password
              </Input>
              {errors.password && <span>This field is required</span>}
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
              Sign in
            </button>
            <button className="w-full border border-gray-300 flex items-center justify-center text-gray-900 p-2 rounded-md mb-4 hover:bg-gray-50">
              <BsTwitter size="1.4rem" className="text-[#1DA1F2] mr-4" /> Sign
              in with Twitter
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
      </div>
      <div className="w-2/4 bg-indigo-500 md:flex justify-center items-center hidden">
        <div className=" flex relative flex-col items-center justify-around w-4/5 h-4/5">
          <img src={Logo} className="w-2/4" />
          <div>
            <h1 className="text-4xl text-gray-50 text-center mb-2">
              Read, review and create articles about things that interests you!
            </h1>
            <p className="text-gray-200 text-center">Everything for free!</p>
          </div>
          <span className="w-20 h-20 rounded-full bottom-3/5 right-12 absolute bg-gray-100 flex items-center justify-center">
            <MdArticle size="3rem" className="text-indigo-600" />
          </span>
          <span className="w-20 h-20 rounded-full top-1/3 left-0 absolute bg-gray-100 flex items-center justify-center">
            <MdReviews size="3rem" className="text-indigo-600" />
          </span>
          <div className="w-20 h-20  top-0 right-0 absolute flex items-center justify-center">
            <span className="w-20 h-20 bg-gray-100  absolute rounded-full"></span>
            <MdCreate size="3rem" className="text-indigo-600 absolute" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
