import dayjs from 'dayjs';
import { useArticles } from 'hooks/useArticles';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const { data: articles } = useArticles();

  return (
    <div>
      <h1 className="text-3xl mb-4">All articles 🗞️</h1>
      <section>
        {articles &&
          articles.map(
            ({ id, title, body, created_at, user: { fullName } }) => {
              const formatedDate = dayjs(created_at).format('DD.MM.YYYY HH:mm');
              return (
                <Link to={`/articles/${id}`} key={id}>
                  <article className="border-2 rounded-md p-4 mb-4 group shadow-md hover:shadow-indigo-400 ease-in-out duration-300">
                    <h2 className="text-2xl mb-2 group-hover:text-indigo-500">
                      {title}
                    </h2>
                    <p className="line-clamp-3 mb-2">{body}</p>
                    <p className="text-right">
                      <span className="font-semibold">{fullName}</span>{' '}
                      <span className="text-gray-600">{formatedDate}</span>
                    </p>
                  </article>
                </Link>
              );
            }
          )}
      </section>
    </div>
  );
};

export { ArticleList };
