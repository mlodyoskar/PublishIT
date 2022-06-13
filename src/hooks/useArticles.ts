import { useQuery } from 'react-query';
import { supabase } from 'supabase';

interface Article {
  id: number;
  created_at: Date;
  updatet_at: Date;
  title: string;
  body: string;
  user: { name: string };
}

const getAllArticles = async () => {
  const { data: articles, error } = await supabase
    .from<Article>('articles')
    .select('*, user:user_id(name)');
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
