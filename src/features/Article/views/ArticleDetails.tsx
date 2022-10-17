import { Button } from 'components/Button/Button';
import { Comment } from 'features/Article/components/Comment/Comment';
import { CommentForm } from 'features/Article/components/CommentForm/CommentForm';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useArticle } from 'features/Article/hooks/useArticle';
import { useComments } from 'features/Article/hooks/useComments';
import { Link, useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getArticleImageUrl } from 'utils/article';
import { formatDate } from 'utils/date';
import { getUserAvatarUrl } from 'utils/user';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useSaveArticle } from '../hooks/useSaveArticle';
import { useAuth } from 'contexts/AuthProvider';

const ArticleDetails = () => {
	const { id } = useParams();
	const article = useArticle(id);
	const { data: comments } = useComments(id);
	const { mutate } = useSaveArticle();
	const { user } = useAuth();

	if (article?.isLoading) {
		return (
			<PageTemplate>
				<LoaderSpinner size={150} />
			</PageTemplate>
		);
	}

	if (!article?.data || !user) {
		return (
			<PageTemplate>
				<article>
					<h1 className="mb-6 text-3xl">Nie znaleziono postu</h1>
				</article>
			</PageTemplate>
		);
	}

	const {
		id: articleId,
		title,
		body,
		isArticleSaved,
		created_at,
		imageUrl,
		user: { id: userId, fullName, username, avatarUrl },
	} = article.data;

	const handleSaveArticle = () => {
		mutate({ article_id: articleId, user_id: user.id });
	};

	return (
		<PageTemplate>
			<div className="lg:mt-12">
				<article className="rounded-md border-2 border-indigo-300 p-3 lg:p-6">
					<h1 className="mb-6 text-3xl">{title}</h1>
					{imageUrl && (
						<img
							className="max-h-96 w-full rounded-md object-cover"
							src={getArticleImageUrl(imageUrl)}
							alt=""
						/>
					)}
					<div className="my-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<img
								alt="article creator avatar"
								className="h-10 w-10 rounded-xl object-cover"
								src={`${getUserAvatarUrl(avatarUrl)}`}
							/>
							<Link
								to={`/users/${userId}`}
								className="text-xl duration-300 ease-in-out hover:text-indigo-700"
							>
								{fullName || username}
							</Link>
						</div>
						<div>
							<Button
								onClick={handleSaveArticle}
								className="flex gap-2"
								variant="primary"
							>
								<BsFillBookmarkFill />
								{isArticleSaved ? 'Zapisano' : 'Zapisz'}
							</Button>
						</div>
					</div>
					<p className="my-4 text-justify">{body}</p>
					<div className="mt-6 flex justify-end">
						<p className="text-sm text-gray-600">{formatDate(created_at)}</p>
					</div>
				</article>
				<div>
					<CommentForm />
				</div>
				<div>
					<p className="my-2 text-xl uppercase text-indigo-700">
						Komentarze <span className="text-lg">({comments?.length})</span>
					</p>
					{comments && comments?.length > 0 && (
						<section className="mb-4 rounded-md border-2 border-indigo-300">
							{comments.map((comment) => {
								return <Comment key={comment.id} commentData={comment} />;
							})}
						</section>
					)}
				</div>
			</div>
		</PageTemplate>
	);
};

export { ArticleDetails };
