import { Input } from 'components/Input/Input';
import { useAuth } from 'contexts/AuthProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsTwitter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUser } from 'hooks/useCreateUser';

type SignupFormProps = {
	handleSetIsLoginClick: () => void;
};

const SignupForm = ({ handleSetIsLoginClick }: SignupFormProps) => {
	const { signInWithTwitter } = useAuth();
	const { mutate, error } = useCreateUser();
	const navigate = useNavigate();

	const signupFormSchema = yup.object({
		username: yup.string().required().min(3).label('username'),
		email: yup.string().required().email().label('Email'),
		password: yup.string().required().label('Password'),
	});
	type FormFields = yup.InferType<typeof signupFormSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: yupResolver(signupFormSchema) });

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		mutate(data);

		if (error) {
			console.log(error);
		} else {
			navigate('/');
		}
	};

	return (
		<>
			<div className="flex flex-col justify-start w-full mb-6">
				<h1 className="text-3xl font-semibold self-start mt-6">Sign up</h1>
				<p className="text-gray-400 self-start mb-6">
					Get access to all articles and interact!
				</p>
			</div>
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col mb-6">
					<Input
						type="text"
						autoComplete="username"
						placeholder="john.doe"
						label="Username"
						errorMessage={errors.username?.message}
						{...register('username')}
					/>
				</div>
				<div className="flex flex-col mb-6">
					<Input
						type="text"
						placeholder="mail@company.com"
						label="Email"
						autoComplete="email"
						inputMode="email"
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<div className="flex flex-col mb-6">
					<Input
						label="Password"
						placeholder="min. 6 characters"
						type="password"
						autoComplete="password"
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>

				<button className="w-full bg-indigo-500 p-2 rounded-md text-white mb-3 hover:bg-indigo-700">
					Sign up
				</button>
				<button
					type="button"
					onClick={signInWithTwitter}
					className="w-full border border-gray-300 flex items-center justify-center text-gray-900 p-2 rounded-md mb-4 hover:bg-gray-50"
				>
					<BsTwitter size="1.4rem" className="text-[#1DA1F2] mr-4" /> Sign up
					with Twitter
				</button>
				<p className="text-sm text-gray-400 text-center">
					Already have an account?{' '}
					<button
						type="button"
						className="text-indigo-500 font-semibold hover:text-indigo-700"
						onClick={handleSetIsLoginClick}
					>
						Login
					</button>
				</p>
			</form>
		</>
	);
};

export { SignupForm };
