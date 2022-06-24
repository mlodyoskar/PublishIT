import { useQuery } from 'react-query';
import { supabase } from 'supabase';
import { ArticleType } from 'types/ArticleType';

const getAllArticles = async () => {
  const { data: articles, error } = await supabase
    .from<ArticleType>('articles')
    .select('*, user:user_id(fullName)')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  if (!articles) {
    throw new Error('Articles not found');
  }
  return articles;
};

const useArticles = () => {
  return useQuery('articles', () => getAllArticles());
};

export { useArticles };
