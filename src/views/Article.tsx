import { useArticle } from 'hooks/useArticle';
import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';

const Article = () => {
  const { slug } = useParams();
  const article = useArticle(slug);

  if (article?.isLoading) {
    return (
      <PageTemplate>
        <article>
          <h1 className="text-3xl mb-6">Ładowanie</h1>
        </article>
      </PageTemplate>
    );
  }

  if (article?.data?.length === 0 || !article?.data) {
    return (
      <PageTemplate>
        <article>
          <h1 className="text-3xl mb-6">Nie znaleziono postu</h1>
        </article>
      </PageTemplate>
    );
  }

  const { title, body } = article.data[0];

  return (
    <PageTemplate>
      <article>
        <h1 className="text-3xl mb-6">{title}</h1>
        <img src="http://via.placeholder.com/640x360" />
        <p className="text-justify">{body}</p>
      </article>
    </PageTemplate>
  );
};

export { Article };
