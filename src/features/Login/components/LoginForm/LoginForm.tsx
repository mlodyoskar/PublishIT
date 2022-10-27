import { Input } from 'components/Input/Input';
import { useAuth } from 'contexts/AuthProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsTwitter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { showErrorToast } from 'utils/toast';

type LoginFormProps = {
	handleSetIsLoginClick: () => void;
};

const LoginForm = ({ handleSetIsLoginClick }: LoginFormProps) => {
	const { signIn, signInWithTwitter } = useAuth();
	const navigate = useNavigate();

	const loginFormSchema = yup.object({
		email: yup.string().required().email().label('Email'),
		password: yup.string().required().label('Password'),
	});

	type FormFields = yup.InferType<typeof loginFormSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: yupResolver(loginFormSchema) });

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		const { error } = await signIn(data);

		if (error) {
			showErrorToast(error.message);
			console.log(error);
		} else {
			navigate('/');
		}
	};

	return (
		<>
			<div className="mb-6 flex w-full flex-col justify-start">
				<h1 className="mt-6 self-start text-3xl font-semibold">Login</h1>
				<p className="mb-6 self-start text-gray-400">
					Get access to all articles and interact!
				</p>
			</div>
			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-6 flex flex-col">
					<Input
						type="text"
						placeholder="mail@company.com"
						label="Email"
						errorMessage={errors.email?.message}
						{...register('email')}
					/>
				</div>
				<div className="mb-6 flex flex-col">
					<Input
						label="Password"
						placeholder="min. 6 characters"
						type="password"
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
				</div>
				<div className="mb-6 flex w-full items-center justify-between">
					<div className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 rounded-sm border-gray-300 text-indigo-500 focus:border-indigo-500 focus:ring-indigo-500"
						/>
						<span>Remember me</span>
					</div>
					<button type="button" className="text-indigo-700">
						Forgot password
					</button>
				</div>
				<button className="mb-3 w-full rounded-md bg-indigo-500 p-2 text-white hover:bg-indigo-700">
					Sign in
				</button>
				<button
					type="button"
					onClick={signInWithTwitter}
					className="mb-4 flex w-full items-center justify-center rounded-md border border-gray-300 p-2 text-gray-900 hover:bg-gray-50"
				>
					<BsTwitter size="1.4rem" className="mr-4 text-[#1DA1F2]" /> Sign in with
					Twitter
				</button>
				<p className="text-center text-sm text-gray-400">
					{"You don't have an account? "}
					<button
						type="button"
						className="font-semibold text-indigo-500 hover:text-indigo-700"
						onClick={handleSetIsLoginClick}
					>
						Sign up
					</button>
				</p>
			</form>
		</>
	);
};

export { LoginForm };
