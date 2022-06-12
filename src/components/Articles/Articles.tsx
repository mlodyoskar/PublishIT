import { useState } from 'react';
import { supabase } from 'supabase';

interface Article {
  id: number;
  created_at: Date;
  updatet_at: Date;
  title: string;
  body: string;
  user_id: string;
}

const getAllArticles = async () => {
  const { data: article, error } = await supabase.from('article').select('*');
  if (error) {
    throw new Error(error.message);
  }
  if (!article) {
    throw new Error('Articles not found');
  }
  return article;
};

const Articles = () => {
  const [allArtciles, setAllArtciles] = useState<Article[] | null>(null);

  return (
    <div>
      <h1>Wszystkie posty</h1>
    </div>
  );
};

export { Articles };
