import { Button } from 'components/Button/Button';
import { Header } from 'components/Header/Header';
import { Input } from 'components/Input/Input';
import { Textarea } from 'components/Textarea/Textarea';
import { useAuth } from 'contexts/AuthProvider';
import { InsertArticleType, useCreateArticle } from 'hooks/useCreateArticle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { PageTemplate } from 'templates/PageTemplate';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ArticleCreation = () => {
  const articleFormSchema = yup.object({
    title: yup.string().required().label('Title'),
    body: yup.string().required().label('Text'),
    // graphicURL: yup.string().label('Cover image'),
  });
  type FormFields = yup.InferType<typeof articleFormSchema>;

  const { user } = useAuth();
  const { mutate } = useCreateArticle();
  const navigate = useNavigate();
  if (!user) {
    return <h1>Nie znaleziono uzytkowika</h1>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(articleFormSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const insertArticleData: InsertArticleType = {
      ...data,
      slug: slugify(data.title),
      user_id: user.id,
    };
    mutate(insertArticleData, {
      onSuccess: () => {
        navigate('/');
      },
    });
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
