import { ArticleList } from 'components/ArticleList/ArticleList';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useArticles } from 'hooks/useArticles';
import { useUserDetails } from 'hooks/useUserDeatils';
import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getUserAvatarUrl } from 'utils/user';

const UserDetails = () => {
	const { id } = useParams();
	const { data: userDetails, status: userStatus } = useUserDetails(id);
	const { data: userArticles, status: articlesStatus } = useArticles(id);

	if (userStatus === 'loading' || articlesStatus === 'loading') {
		return (
			<PageTemplate>
				<LoaderSpinner />
			</PageTemplate>
		);
	}

	if (!userDetails) {
		return (
			<PageTemplate>
				<div>{"User wasn't found"}</div>
			</PageTemplate>
		);
	}
	return (
		<PageTemplate>
			<div className="rounded-md mt-12 flex gap-6  px-4 shadow-md border-2 shadow-indigo-400 py-4">
				<div className="">
					<img
						className="w-24 h-24 rounded-md object-cover"
						src={getUserAvatarUrl(userDetails.avatarUrl)}
					/>
				</div>
				<div className="w-3/4">
					<h1 className="text-gray-900 text-3xl">
						{userDetails.fullName || userDetails.username}
					</h1>
					{userDetails.fullName && (
						<span className="text-gray-700 text-sm">
							@{userDetails.username}
						</span>
					)}

					<p>
						{userDetails.bio ? userDetails.bio : 'User didnt provide bio yet'}
					</p>
					<div className="flex gap-6 pt-4">
						<p className="text-gray-600 font-medium">
							Followers: {userDetails.followersCount}
						</p>
						<p className="text-gray-600 font-medium">
							Followed by: {userDetails.followedByCount}
						</p>
					</div>
				</div>
			</div>
			{userArticles && userArticles.length > 0 && (
				<div className="pt-4">
					<h2 className="text-2xl mb-4">User articles 🗞️</h2>
					<ArticleList articles={userArticles} />
				</div>
			)}
		</PageTemplate>
	);
};

export { UserDetails };
