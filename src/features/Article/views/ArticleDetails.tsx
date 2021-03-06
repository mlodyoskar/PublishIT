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

const ArticleDetails = () => {
	const { id } = useParams();
	const article = useArticle(id);
	const { data: comments } = useComments(id);

	if (article?.isLoading) {
		return (
			<PageTemplate>
				<LoaderSpinner size={150} />
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
		created_at,
		imageUrl,
		user: { id: userId, fullName, username, avatarUrl },
	} = article.data;

	console.log(typeof created_at);

	return (
		<PageTemplate>
			<div>
				<article className="border-2 border-indigo-300 rounded-md p-6">
					<h1 className="text-3xl mb-6">{title}</h1>
					{imageUrl && (
						<img
							className="w-full rounded-md max-h-96 object-cover"
							src={getArticleImageUrl(imageUrl)}
						/>
					)}
					<div className="my-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<img
								alt="article creator avatar"
								className="w-10 h-10 rounded-xl object-cover"
								src={`${getUserAvatarUrl(avatarUrl)}`}
							/>
							<Link
								to={`/users/${userId}`}
								className="text-xl hover:text-indigo-700 ease-in-out duration-300"
							>
								{fullName || username}
							</Link>
						</div>
						<div>
							<Button variant="primary">Obserwuj</Button>
						</div>
					</div>
					<p className="text-justify my-4">{body}</p>
					<div className="flex justify-end mt-6">
						<p className="text-gray-600 text-sm">{formatDate(created_at)}</p>
					</div>
				</article>
				<div>
					<CommentForm />
				</div>
				<div>
					<p className="text-xl my-2 uppercase text-indigo-700">
						Komentarze <span className="text-lg">({comments?.length})</span>
					</p>
					<section className="border-2 border-indigo-300 rounded-md mb-4">
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

export { ArticleDetails };
