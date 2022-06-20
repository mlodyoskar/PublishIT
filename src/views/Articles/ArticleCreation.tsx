import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Input } from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import { useForm } from 'react-hook-form';
import { PageTemplate } from 'templates/PageTemplate';

const ArticleCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const onSubmit: SubmitHandler = async (data) => {};
  return (
    <PageTemplate>
      <Header>Add new article 🗞️</Header>
      <form className="flex flex-col gap-6">
        <Input type="text" {...register('title')}>
          Title
        </Input>
        <Textarea rows={15} {...register('body')}>
          Text
        </Textarea>
        <Button fullw>Add new article</Button>
      </form>
    </PageTemplate>
  );
};

export { ArticleCreation };
