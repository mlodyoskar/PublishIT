import { Header } from 'components/Header/Header';
import { useAuth } from 'contexts/AuthProvider';
import dayjs from 'dayjs';
import { useSaveArticle } from 'features/Article/hooks/useSaveArticle';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ArticleType } from 'types/ArticleType';
import { UserType } from 'types/UserType';
import { getArticleImageUrl } from 'utils/article';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Article extends ArticleType {
	user: UserType;
	isSaved: boolean;
}

type ArticleListProps = {
	articles: Article[];
};

const ArticleList = ({ articles }: ArticleListProps) => {
	const { mutate } = useSaveArticle();
	const { user } = useAuth();
	const [autoAnimateRef] = useAutoAnimate<HTMLElement>();

	const handleSaveArticle = (
		e: React.MouseEvent,
		articleId: string,
		userId: string
	) => {
		e.preventDefault();
		mutate({ article_id: articleId, user_id: userId });
	};

	if (!user) {
		return <Header>User was not found</Header>;
	}

	return (
		<section ref={autoAnimateRef} className="flex flex-col gap-4 my-4">
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
									<div className="flex justify-between items-start">
										<h2 className="text-2xl mb-2 font-medium group-hover:text-indigo-500 w-4/5">
											{title}
										</h2>
										<button onClick={(e) => handleSaveArticle(e, id, user.id)}>
											<BsFillBookmarkFill
												className={`${
													isSaved ? 'text-indigo-600' : 'text-gray-600'
												} hover:text-indigo-400 transition-all hover:scale-105 
												`}
												size="2rem"
											/>
										</button>
									</div>
									<p className="line-clamp-3 mb-2">{body}</p>
									<p className="text-right justify-self-end mt-auto">
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
