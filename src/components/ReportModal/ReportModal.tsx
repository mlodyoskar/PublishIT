import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { RadioInput } from 'components/RadioInput/RadioInput';
import { Textarea } from 'components/Textarea/Textarea';
import {
	ReportCategoryType,
	InsertReportType,
	ReportType,
} from 'features/Article/hooks/useCreateReport';
import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

type ReportModalProps = {
	isOpen: boolean;
	reportType: ReportType;
	commentId: string;
	handler: () => void;
	submitHandler: (data: InsertReportType) => void;
};

const commentReportFormSchema = yup.object({
	category: yup
		.mixed<ReportCategoryType>()
		.required()
		.label('Category of report'),
	description: yup.string().label('Description'),
});

type FormFields = yup.InferType<typeof commentReportFormSchema>;

const ReportModal = ({
	isOpen,
	handler,
	submitHandler,
	reportType,
	commentId,
}: ReportModalProps) => {
	const { id: article_id } = useParams();

	const user = useLoggedInUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({ resolver: yupResolver(commentReportFormSchema) });

	if (!article_id) {
		throw new Error('Comment not found');
	}

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		const insertReportData: InsertReportType = {
			...data,
			category: data.category,
			user_id: user?.id,
			article_id: article_id,
			comment_id: commentId,
			type: reportType,
		};
		submitHandler(insertReportData);
		handler();
	};

	return (
		<Modal handler={handler} modalHeading="Report Abuse" isOpen={isOpen}>
			<p>
				Thank you for reporting any abuses that violate our code of conduct or
				regulations. We continually strive to make our portal a good place for
				everyone.
			</p>
			<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-4 flex flex-col gap-6">
					<RadioInput
						label="Hate speech"
						{...register('category')}
						value="hate-speech"
						errorMessage={errors.category?.message}
					/>
					<RadioInput
						label="Vulgarisms"
						{...register('category')}
						value="vulgarisms"
					/>
					<RadioInput label="Spam" {...register('category')} value="spam" />
					<RadioInput label="Others" {...register('category')} value="others" />
				</div>
				<Textarea label="Description" rows={3} {...register('description')} />
				<Button>Submit Report</Button>
			</form>
		</Modal>
	);
};

export { ReportModal };
