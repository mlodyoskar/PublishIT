import dayjs from 'dayjs';
import { useArticles } from 'hooks/useArticles';
import { Link } from 'react-router-dom';
import { getArticleImageUrl } from 'utils/article';

const ArticleList = () => {
  const { data: articles } = useArticles();

  return (
    <div>
      <h1 className="text-3xl mb-4">All articles 🗞️</h1>
      <section className="flex flex-col gap-4">
        {articles &&
          articles.map(
            ({ id, title, body, created_at, imageUrl, user: { fullName } }) => {
              const formatedDate = dayjs(created_at).format('DD.MM.YYYY HH:mm');
              return (
                <Link to={`/articles/${id}`} key={id}>
                  <article className="border-2 rounded-md p-4 group shadow-md hover:shadow-indigo-400 ease-in-out duration-300 flex gap-3 group self-stretch max-h-48 h-48">
                    <div className="w-2/5 overflow-hidden rounded-md">
                      <img
                        className=" object-cover h-full w-full group-hover:scale-110 duration-300 "
                        src={getArticleImageUrl(imageUrl)}
                      />
                    </div>
                    <div className="w-3/5 h-full flex flex-col">
                      <h2 className="text-2xl mb-2 group-hover:text-indigo-500">
                        {title}
                      </h2>
                      <p className="line-clamp-3 mb-2">{body}</p>
                      <p className="text-right justify-self-end">
                        <span className="font-semibold">{fullName}</span>{' '}
                        <span className="text-gray-600">{formatedDate}</span>
                      </p>
                    </div>
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
