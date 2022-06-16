import { Comment } from 'components/Comment/Comment';
import { useArticle } from 'hooks/useArticle';
import { useComments } from 'hooks/useComments';
import { Link, useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { formatDate } from 'utils/date';
import { getUserAvatarUrl } from 'utils/user';

const Article = () => {
  const { id } = useParams();
  const article = useArticle(id);
  const { data: comments } = useComments(id);

  if (article?.isLoading) {
    return (
      <PageTemplate>
        <article>
          <h1 className="text-3xl mb-6">Ładowanie</h1>
        </article>
      </PageTemplate>
    );
  }

  if (!article?.data) {
    return (
      <PageTemplate>
        <article>
          <h1 className="text-3xl mb-6">Nie znaleziono postu</h1>
        </article>
      </PageTemplate>
    );
  }

  const {
    title,
    body,
    user: { fullName, avatarUrl },
  } = article.data;

  return (
    <PageTemplate>
      <div>
        <article className="bg-indigo-50 rounded-md p-6">
          <h1 className="text-3xl mb-6">{title}</h1>
          <img
            className="rounded-md"
            src="http://via.placeholder.com/640x360"
          />
          <div className="my-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-xl object-cover"
                src={`${getUserAvatarUrl(avatarUrl)}`}
              />
              <p className="text-lg">{fullName}</p>
            </div>
            <div>
              {/* {make button nout of this with variants} */}
              <button className="flex text-gray-50 bg-indigo-600 px-2 py-1 shadow-glow rounded-md hover:shadow-none hover:bg-indigo-700 ease-in-out duration-300">
                Obserwuj
              </button>
            </div>
          </div>
          <p className="text-justify my-4">{body}</p>
        </article>

        <div>
          <p className="text-xl my-2 uppercase text-indigo-700">
            Komentarze <span className="text-lg">({comments?.length})</span>
          </p>
          <section className="bg-indigo-100 rounded-md">
            {comments &&
              comments.map((comment) => {
                return <Comment key={comment.id} commentData={comment} />;
              })}
          </section>
        </div>
      </div>
    </PageTemplate>
  );
};

export { Article };
