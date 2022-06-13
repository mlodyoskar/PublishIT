import dayjs from 'dayjs';
import { useArticles } from 'hooks/useArticles';
import { Link } from 'react-router-dom';

const Articles = () => {
  const { data: articles } = useArticles();

  return (
    <div>
      <h1 className="text-3xl mb-4">All articles 🗞️</h1>
      <section>
        {articles &&
          articles.map(({ id, title, body, created_at, user: { name } }) => {
            const formatedDate = dayjs(created_at).format('DD.MM.YYYY HH:mm');
            console.log(formatedDate);
            return (
              <Link to={`/article/${id}`} key={id}>
                <article className="border-2 rounded-md border-indigo-300 p-4 mb-4 ">
                  <h2 className="text-2xl mb-2 ">{title}</h2>
                  <p className="line-clamp-3 mb-2">{body}</p>
                  <p className="text-right">
                    <span className="font-semibold">{name}</span>{' '}
                    <span className="text-gray-600">{formatedDate}</span>
                  </p>
                </article>
              </Link>
            );
          })}
      </section>
    </div>
  );
};

export { Articles };
