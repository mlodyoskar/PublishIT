import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';

const getArticle = async (slug: string) => {
  const { data: articles, error } = await supabase
    .from<ArticleType>('articles')
    .select('*, user:user_id(name)')
    .eq('slug', slug);

  if (error) {
    throw new Error(error.message);
  }
  if (!articles) {
    throw new Error('Articles not found');
  }
  return articles;
};

const useArticle = (slug: string | undefined) => {
  if (slug === undefined) return;
  return useQuery(['articles', slug], () => getArticle(slug));
};

export { useArticle };
