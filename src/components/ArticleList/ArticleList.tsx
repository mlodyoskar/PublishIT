import dayjs from 'dayjs';
import { useSaveArticle } from 'features/Article/hooks/useSaveArticle';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';
import { getArticleImageUrl } from 'utils/article';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';

interface Article extends ArticleType {
	user: UserType;
	isSaved: boolean;
}

type ArticleListProps = {
	articles: Article[];
};

const ArticleList = ({ articles }: ArticleListProps) => {
	const { mutate } = useSaveArticle();
	const user = useLoggedInUser();
	const [autoAnimateRef] = useAutoAnimate<HTMLElement>();

	const handleSaveArticle = (
		e: React.MouseEvent,
		articleId: string,
		userId: string
	) => {
		e.preventDefault();
		mutate({ article_id: articleId, user_id: userId });
	};

	return (
		<section ref={autoAnimateRef} className="my-4 flex flex-col gap-4">
			{articles.map(
				({
					id,
					title,
					body,
					created_at,
					imageUrl,
					isSaved,
					user: { fullName, username },
				}) => {
					const formatedDate = dayjs(created_at).format('DD.MM.YYYY HH:mm');
					return (
						<Link to={`/articles/${id}`} key={id}>
							<article className="article-item group group flex flex-col gap-3 self-stretch rounded-md border-2 p-4 shadow-md duration-300 ease-in-out hover:shadow-indigo-400 md:h-48 md:max-h-48 md:flex-row">
								{imageUrl && (
									<div className="h-32 max-h-32 overflow-hidden rounded-md md:h-full md:max-h-full md:w-2/5">
										<img
											className=" h-full w-full bg-center object-cover duration-300 group-hover:scale-110"
											src={getArticleImageUrl(imageUrl)}
											alt=""
										/>
									</div>
								)}
								<div
									className={`${
										imageUrl ? 'md:w-3/5' : 'md:w-full'
									} flex h-full flex-col`}
								>
									<div className="flex items-start justify-between">
										<h2 className="mb-2 w-4/5 text-2xl font-medium group-hover:text-indigo-500">
											{title}
										</h2>
										<button onClick={(e) => handleSaveArticle(e, id, user.id)}>
											<BsFillBookmarkFill
												className={`${
													isSaved ? 'text-indigo-600' : 'text-gray-600'
												} transition-all hover:scale-105 hover:text-indigo-400 
												`}
												size="2rem"
											/>
										</button>
									</div>
									<p className="mb-2 line-clamp-3">{body}</p>
									<p className="mt-auto justify-self-end text-right">
										<span className="font-semibold">{fullName || username}</span>{' '}
										<span className="text-gray-600">{formatedDate}</span>
									</p>
								</div>
							</article>
						</Link>
					);
				}
			)}
		</section>
	);
};

export { ArticleList };
