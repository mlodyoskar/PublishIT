import { Input } from 'components/Input/Input';
import { useAuth } from 'contexts/AuthProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsTwitter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUser } from 'features/Login/hooks/useCreateUser';

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
			<div className="mb-6 flex w-full flex-col justify-start">
				<h1 className="mt-6 self-start text-3xl font-semibold">Sign up</h1>
				<p className="mb-6 self-start text-gray-400">
					Get access to all articles and interact!
				</p>
			</div>
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-6 flex flex-col">
					<Input
						type="text"
						autoComplete="username"
						placeholder="john.doe"
						label="Username"
						errorMessage={errors.username?.message}
						{...register('username')}
					/>
				</div>
				<div className="mb-6 flex flex-col">
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
				<div className="mb-6 flex flex-col">
					<Input
						label="Password"
						placeholder="min. 6 characters"
						type="password"
						autoComplete="password"
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>

				<button className="mb-3 w-full rounded-md bg-indigo-500 p-2 text-white hover:bg-indigo-700">
					Sign up
				</button>
				<button
					type="button"
					onClick={signInWithTwitter}
					className="mb-4 flex w-full items-center justify-center rounded-md border border-gray-300 p-2 text-gray-900 hover:bg-gray-50"
				>
					<BsTwitter size="1.4rem" className="mr-4 text-[#1DA1F2]" /> Sign up with
					Twitter
				</button>
				<p className="text-center text-sm text-gray-400">
					Already have an account?{' '}
					<button
						type="button"
						className="font-semibold text-indigo-500 hover:text-indigo-700"
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
