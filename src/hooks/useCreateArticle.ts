import { useMutation } from 'react-query';
import { supabase } from 'supabase';

export type InsertArticleType = {
  title: string;
  body: string;
  slug: string;
  user_id: string;
  imageUrl?: string;
  imageFile?: File;
};

const insertArticle = async ({
  title,
  body,
  slug,
  user_id,
  imageUrl,
  imageFile,
}: InsertArticleType) => {
  const { data: article } = await supabase
    .from<InsertArticleType>('articles')
    .select('*')
    .eq('slug', slug);

  if (!article || article.length > 0) {
    throw new Error('There is already article with that title!');
  }

  const { data: insertedArticle, error: insertError } = await supabase
    .from<InsertArticleType>('articles')
    .insert([
      {
        title,
        body,
        slug,
        user_id,
        imageUrl,
      },
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  if (imageFile) {
    console.log(imageFile);
    const { error: uploadError } = await supabase.storage
      .from('article-image')
      .upload(slug, imageFile);

    if (uploadError) {
      throw new Error(uploadError.message);
    }
  }

  return insertedArticle;
};

const useCreateArticle = () => {
  return useMutation((articleData: InsertArticleType) =>
    insertArticle(articleData)
  );
};

export { useCreateArticle };
