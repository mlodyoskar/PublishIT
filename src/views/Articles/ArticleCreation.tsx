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
    title: yup.string().required().max(100).label('Title'),
    body: yup.string().required().max(600).label('Text'),
    imageFile: yup.mixed(),
  });

  type FormFields = yup.InferType<typeof articleFormSchema>;

  const { user } = useAuth();
  const { status, mutate } = useCreateArticle();
  const navigate = useNavigate();
  console.log('Status:', status);
  if (!user) {
    return <h1>Nie znaleziono uzytkowika</h1>;
  }

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(articleFormSchema) });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const slug = slugify(data.title);
    const insertArticleData: InsertArticleType = {
      ...data,
      slug: slug,
      user_id: user.id,
      imageUrl: slug,
      imageFile: data.imageFile[0],
    };
    mutate(insertArticleData, {
      onSuccess: () => {
        navigate(`/`);
      },
    });
  };

  const image = watch('imageFile');

  return (
    <PageTemplate>
      <Header>Add new article 🗞️</Header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Cover image"
          type="file"
          accept="image/png, image/jpg"
          {...register('imageFile')}
        />
        {image && (
          <div className="max-h-80 h-80 flex items-center p-2 shadow-sm  rounded-lg border-2">
            <img
              className="rounded-md object-cover h-full w-full bg-center"
              src={URL.createObjectURL(image[0])}
            />
          </div>
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

        <Button disabled={status === 'loading'} fullw>
          Add new article
        </Button>
      </form>
    </PageTemplate>
  );
};

export { ArticleCreation };
