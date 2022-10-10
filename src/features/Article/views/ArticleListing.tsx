import { Button } from 'components/Button/Button';
import { Comment } from 'features/Article/components/Comment/Comment';
import { useArticle } from 'features/Article/hooks/useArticle';
import { useComments } from 'features/Article/hooks/useComments';
import { Link, useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getArticleImageUrl } from 'utils/article';
import { formatDate } from 'utils/date';
import { getUserAvatarUrl } from 'utils/user';

const ArticleListing = () => {
	const { id } = useParams();
	const article = useArticle(id);
	const { data: comments } = useComments(id);

	if (article?.isLoading) {
		return (
			<PageTemplate>
				<article>
					<h1 className="mb-6 text-3xl">Ładowanie</h1>
				</article>
			</PageTemplate>
		);
	}

	if (!article?.data) {
		return (
			<PageTemplate>
				<article>
					<h1 className="mb-6 text-3xl">Nie znaleziono postu</h1>
				</article>
			</PageTemplate>
		);
	}

	const {
		title,
		body,
		created_at,
		imageUrl,
		user: { id: userId, fullName, username },
	} = article.data;

	return (
		<PageTemplate>
			<div>
				<article className="rounded-md bg-indigo-50 p-6">
					<h1 className="mb-6 text-3xl">{title}</h1>
					{imageUrl && (
						<img
							className="max-h-96 w-full rounded-md"
							src={getArticleImageUrl(imageUrl)}
						/>
					)}
					<div className="my-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<img
								alt="article creator avatar"
								className="h-10 w-10 rounded-xl object-cover"
								src={`${getUserAvatarUrl(userId)}`}
							/>
							<Link
								to={`/users/${username}`}
								className="text-xl duration-300 ease-in-out hover:text-indigo-700"
							>
								{fullName}
							</Link>
						</div>
						<div>
							<Button variant="primary">Obserwuj</Button>
						</div>
					</div>
					<p className="my-4 text-justify">{body}</p>
					<div className="mt-6 flex justify-end">
						<p className="text-sm text-gray-600">{formatDate(created_at)}</p>
					</div>
				</article>

				<div>
					<p className="my-2 text-xl uppercase text-indigo-700">
						Komentarze <span className="text-lg">({comments?.length})</span>
					</p>
					<section className="rounded-md bg-indigo-100">
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

export { ArticleListing };
