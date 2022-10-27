import { Button } from 'components/Button/Button';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useAuth } from 'contexts/AuthProvider';
import { useFollowersCount } from 'features/Home/hooks/useFollowersCount';
import { useFollowUser } from 'features/User/hooks/useFollowUser';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUserAvatarUrl } from 'utils/user';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';

type AsideFeedItemProps = {
	header: string;
	description?: string;
};

const AsideFeedItem = ({ header, description }: AsideFeedItemProps) => {
	const { data, status } = useFollowersCount();
	const { mutate } = useFollowUser();
	const user = useLoggedInUser();
	const [animationParent] = useAutoAnimate<HTMLDivElement>();

	if (status === 'loading') {
		return <LoaderSpinner />;
	}

	if (!data) {
		return <div>Couldnt get top followed users</div>;
	}

	const handleFollowButtonClick = (userToFollowId: string) => {
		mutate({ follower_id: user.id, user_id: userToFollowId });
	};

	return (
		<div className="flex flex-col rounded-lg border-2 p-4 shadow-md">
			<div className="mb-2">
				<h3 className="uppercase  ">{header}</h3>
				{description && <p className="text-xs text-gray-600">{description}</p>}
			</div>
			<hr />
			<div ref={animationParent} className="flex flex-col gap-3 py-2">
				{data.map(({ id, username, fullname, followers, avatarurl }) => (
					<div className="flex" key={username}>
						<Link className="group flex items-center gap-2" to={`/users/${id}`}>
							<div className="h-8 w-8 rounded-xl">
								<img
									className="h-8 w-8 rounded-md object-cover"
									src={getUserAvatarUrl(avatarurl)}
									alt={`${username}'s avatar`}
								/>
							</div>
							<div>
								<p className="overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:text-indigo-700">
									{fullname || username}
								</p>
								<p className="text-xs text-gray-800">Obserwujących: {followers}</p>
							</div>
						</Link>
						<Button
							onClick={() => handleFollowButtonClick(id)}
							className="ml-auto flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500"
						>
							<AiOutlineUserAdd />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export { AsideFeedItem };
