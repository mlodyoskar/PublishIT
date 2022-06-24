import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Input } from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import { useAuth } from 'contexts/AuthProvider';
import { InsertArticleType, useCreateArticle } from 'hooks/useCreateArticle';
import { SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';
import { PageTemplate } from 'templates/PageTemplate';

const ArticleCreation = () => {
  type FormFields = {
    title: string;
    body: string;
  };
  const { user } = useAuth();
  if (!user) {
    return <h1>Nie znaleziono uytkownika</h1>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const insertArticleData: InsertArticleType = {
      ...data,
      slug: slugify(data.title),
      user_id: user.id,
    };
    const insertdData = useCreateArticle(insertArticleData);
    console.log(insertdData);
  };
  return (
    <PageTemplate>
      <Header>Add new article 🗞️</Header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
