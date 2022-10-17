import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Button/Button';
import { FileInput } from 'components/FileInput/FileInput';
import { Header } from 'components/Header/Header';
import { Input } from 'components/Input/Input';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { Textarea } from 'components/Textarea/Textarea';
import { useAuth } from 'contexts/AuthProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { PageNotFound } from 'views/404';
import * as yup from 'yup';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useUserDetails } from '../hooks/useUserDeatils';

const editProfileFormSchema = yup.object({
	fullName: yup.string().required().label('Full name'),
	bio: yup.string().label('Bio'),
	imageFile: yup.mixed(),
});

type FormFields = yup.InferType<typeof editProfileFormSchema>;

const UserEdition = () => {
	const { user } = useAuth();
	const { id: userId } = useParams();
	const { data: userData, status: userDetailsStatus } = useUserDetails(userId);
	const { mutate } = useUpdateUser();
	const navigate = useNavigate();

	const { register, watch, reset, setValue, handleSubmit } = useForm<FormFields>(
		{
			resolver: yupResolver(editProfileFormSchema),
		}
	);

	useEffect(() => {
		if (userData === undefined) {
			return;
		}

		reset({
			bio: userData.bio,
			fullName: userData.fullName,
		});
	}, [userData]);

	if (userDetailsStatus === 'loading') {
		return <LoaderSpinner />;
	}

	if (user?.id != userId) {
		return <PageNotFound />;
	}

	if (!userData) {
		return <PageNotFound />;
	}

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		if (!userId) {
			return;
		}

		mutate(
			{
				id: userId,
				bio: data.bio,
				fullName: data.fullName,
				imageFile: data.imageFile[0],
			},
			{ onSuccess: () => navigate(`/users/${userId}`) }
		);
	};

	const deleteThumbnail = () => {
		setValue('imageFile', undefined);
	};

	const image = watch('imageFile');
	console.log(image);
	return (
		<PageTemplate>
			<div className="my-12">
				<Header>Edit your profile</Header>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="w-1/3">
						<p className="mb-1 text-sm">Change your profile picture</p>
						{image && image[0] ? (
							<div className="relative flex h-80 max-h-80 items-center rounded-lg border-2 p-2 shadow-sm">
								<img
									className="h-full w-full rounded-md bg-center object-cover"
									src={URL.createObjectURL(image[0])}
									alt=""
								/>
								<button
									onClick={deleteThumbnail}
									className="absolute bottom-4 right-4 flex items-center justify-center rounded-md bg-white p-1"
								>
									<p className="sr-only">Delete photo</p>
									<BsFillTrashFill size="2rem" className=" text-indigo-500" />
								</button>
							</div>
						) : (
							<FileInput accept="image/png, image/jpg" {...register('imageFile')} />
						)}
					</div>
					<Input label="Full name" type="text" {...register('fullName')} />
					<Textarea rows={4} label="Say some words about you" {...register('bio')} />
					<Button type="submit">Save changes</Button>
				</form>
			</div>
		</PageTemplate>
	);
};

export { UserEdition };
