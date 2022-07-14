import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Button/Button';
import { Textarea } from 'components/Textarea/Textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const CommentForm = () => {
	const commentFormSchema = yup.object({
		body: yup.string().label('Comment'),
	});

	type FormFields = yup.InferType<typeof commentFormSchema>;

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormFields>({ resolver: yupResolver(commentFormSchema) });

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		console.log(data);
	};
	const showButton = watch('body') !== '';
	console.log(showButton);

	return (
		<form className="flex flex-col gap-4 py-4 px-2">
			<Textarea {...register('body')} label="Add comment" rows={2} />
			<Button fullw={false}>Add comment</Button>
		</form>
	);
};

export { CommentForm };
