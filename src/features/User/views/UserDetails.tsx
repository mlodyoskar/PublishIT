import { ArticleList } from 'components/ArticleList/ArticleList';
import { Button } from 'components/Button/Button';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useArticles } from 'features/Article/hooks/useArticles';
import { useUserDetails } from 'features/User/hooks/useUserDeatils';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getUserAvatarUrl } from 'utils/user';
import { useFollowUser } from '../hooks/useFollowUser';
import { useIsFollwingAlready } from '../hooks/useIsFollowingAlready';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const UserDetails = () => {
	const { id } = useParams();
	const { data: userDetails, status: userStatus } = useUserDetails(id);
	const { mutate } = useFollowUser();
	const user = useLoggedInUser();
	const { data: isFollowingAlready } = useIsFollwingAlready(id);
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
	if (!id) {
		return (
			<PageTemplate>
				<div>{"User wasn't found"}</div>
			</PageTemplate>
		);
	}

	const handleFollowButtonClick = (userToFollowId: string) => {
		mutate({ follower_id: user.id, user_id: userToFollowId });
	};
	return (
		<PageTemplate>
			<div className="mt-12 flex gap-6 rounded-md  border-2 px-4 py-4 shadow-md shadow-indigo-400">
				<div className="w-1/6">
					<img
						className="h-24 w-24 rounded-md object-cover"
						src={getUserAvatarUrl(userDetails.avatarUrl)}
						alt={`${userDetails.fullName}s avatar`}
					/>
				</div>
				<div className="w-4/6">
					<h1 className="text-3xl text-gray-900">
						{userDetails.fullName || userDetails.username}
					</h1>
					{userDetails.fullName && (
						<span className="text-sm text-gray-700">@{userDetails.username}</span>
					)}

					<p>{userDetails.bio ? userDetails.bio : 'User didnt provide bio yet'}</p>
					<div className="flex gap-6 pt-4">
						<p className="font-medium text-gray-600">
							Followers: {userDetails.followersCount}
						</p>
						<p className="font-medium text-gray-600">
							Followed by: {userDetails.followedByCount}
						</p>
					</div>
				</div>
				<div className="flex w-1/6 justify-center ">
					{user.id !== id &&
						(isFollowingAlready ? (
							<Button
								onClick={() => handleFollowButtonClick(id)}
								className="flex h-12 w-full gap-2"
							>
								<RiUserUnfollowLine /> Unfollow
							</Button>
						) : (
							<Button
								onClick={() => handleFollowButtonClick(id)}
								className="flex h-12 w-full gap-2"
							>
								<AiOutlineUserAdd />
								Follow
							</Button>
						))}
				</div>
			</div>
			{userArticles && userArticles.length > 0 && (
				<div className="pt-4">
					<h2 className="mb-4 text-2xl">User articles 🗞️</h2>
					<ArticleList articles={userArticles} />
				</div>
			)}
		</PageTemplate>
	);
};

export { UserDetails };
