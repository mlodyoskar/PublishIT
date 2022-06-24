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
  const { data: article, error: selectError } = await supabase
    .from<InsertArticleType>('articles')
    .select('*')
    .eq('slug', slug);

  if (!article || article.length > 0) {
    console.log(article);
    console.log(selectError);
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
      },
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }
  return insertedArticle;
};

const useCreateArticle = () => {
  return useMutation((articleData: InsertArticleType) =>
    insertArticle(articleData)
  );
};

export { useCreateArticle };
