import dayjs from 'dayjs';
import { useArticles } from 'hooks/useArticles';
import { Link } from 'react-router-dom';
import { getArticleImageUrl } from 'utils/article';

const ArticleList = () => {
  const { data: articles } = useArticles();

  return (
    <div className="mx-4 md:m-0">
      <h1 className="text-3xl mb-4">All articles 🗞️</h1>
      <section className="flex flex-col gap-4">
        {articles &&
          articles.map(
            ({ id, title, body, created_at, imageUrl, user: { fullName } }) => {
              const formatedDate = dayjs(created_at).format('DD.MM.YYYY HH:mm');
              return (
                <Link to={`/articles/${id}`} key={id}>
                  <article className="border-2 rounded-md p-4 group shadow-md hover:shadow-indigo-400 ease-in-out duration-300 flex flex-col md:flex-row gap-3 group self-stretch md:max-h-48 md:h-48">
                    {imageUrl && (
                      <div className="md:w-2/5 max-h-32 h-32 md:max-h-full md:h-full overflow-hidden rounded-md">
                        <img
                          className=" object-cover h-full w-full group-hover:scale-110 duration-300 bg-center"
                          src={getArticleImageUrl(imageUrl)}
                        />
                      </div>
                    )}
                    <div
                      className={`${
                        imageUrl ? 'md:w-3/5' : 'md:w-full'
                      } h-full flex flex-col`}
                    >
                      <h2 className="text-2xl mb-2 font-medium group-hover:text-indigo-500">
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
