import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { RadioInput } from 'components/RadioInput/RadioInput';
import { Textarea } from 'components/Textarea/Textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type ReportModalProps = {
  isOpen: boolean;
  handler: () => void;
};

const commentReportFormSchema = yup.object({
  category: yup.string().required().label('Category of report'),
  description: yup.string().label('Description'),
});

type FormFields = yup.InferType<typeof commentReportFormSchema>;

const ReportModal = ({ isOpen, handler }: ReportModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };
  return (
    <Modal handler={handler} modalHeading="Report Abuse" isOpen={isOpen}>
      <p>
        Thank you for reporting any abuses that violate our code of conduct or
        regulations. We continually strive to make our portal a good place for
        everyone.
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-4">
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
