import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';

const getArticle = async (id: string) => {
  const { data: articles, error } = await supabase
    .from<ArticleType>('articles')
    .select('*, user:user_id(fullName, avatarUrl)')
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  if (!articles) {
    throw new Error('Articles not found');
  }
  return articles[0];
};

const useArticle = (id: string | undefined) => {
  if (id === undefined) return;
  return useQuery(['articles', id], () => getArticle(id));
};

export { useArticle };
