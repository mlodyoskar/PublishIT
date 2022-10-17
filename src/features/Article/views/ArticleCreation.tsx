import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Input } from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import { useAuth } from 'contexts/AuthProvider';
import {
	InsertArticleType,
	useCreateArticle,
} from 'features/Article/hooks/useCreateArticle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { PageTemplate } from 'templates/PageTemplate';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FileInput } from 'components/FileInput/FileInput';
import { BsFillTrashFill } from 'react-icons/bs';

const ArticleCreation = () => {
	const articleFormSchema = yup.object({
		title: yup.string().required().label('Title'),
		body: yup.string().required().label('Text'),
		imageFile: yup.mixed(),
	});

	type FormFields = yup.InferType<typeof articleFormSchema>;

	const { user } = useAuth();
	const { status, mutate } = useCreateArticle();
	const navigate = useNavigate();

	if (!user) {
		return <h1>Nie znaleziono uzytkowika</h1>;
	}

	const {
		register,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormFields>({ resolver: yupResolver(articleFormSchema) });

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		const slug = slugify(data.title);
		const insertArticleData: InsertArticleType = {
			...data,
			slug: slug,
			user_id: user.id,
			imageUrl: data.imageFile[0] && slug,
			imageFile: data.imageFile[0],
		};

		mutate(insertArticleData, {
			onSuccess: () => {
				navigate(`/`);
			},
		});
	};

	const deleteThumbnail = () => {
		setValue('imageFile', undefined);
	};

	const image = watch('imageFile');

	return (
		<PageTemplate>
			<Header>Add new article 🗞️</Header>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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

				<Input
					label="Title"
					type="text"
					errorMessage={errors.title?.message}
					{...register('title')}
				/>

				<Textarea
					label="Text"
					errorMessage={errors.body?.message}
					rows={15}
					{...register('body')}
				/>

				<Button className="mb-8" disabled={status === 'loading'} fullw>
					Add new article
				</Button>
			</form>
		</PageTemplate>
	);
};

export { ArticleCreation };
