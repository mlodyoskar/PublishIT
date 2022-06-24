import { useMutation, useQuery } from 'react-query';
import { supabase } from 'supabase';

export type InsertArticleType = {
  title: string;
  body: string;
  slug: string;
  user_id: string;
};

const insertArticle = async ({
  title,
  body,
  slug,
  user_id,
}: InsertArticleType) => {
  const { data: insertedArticle, error } = await supabase
    .from<InsertArticleType>('articles')
    .insert([
      {
        title,
        body,
        slug,
        user_id,
      },
    ]);
  if (error) {
    console.log(error);
  }
  return insertedArticle;
};

const useCreateArticle = (data: InsertArticleType) => {
  return useMutation(() => insertArticle(data));
};

export { useCreateArticle };
