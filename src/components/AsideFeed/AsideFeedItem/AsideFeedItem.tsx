import { Button } from 'components/Button/Button';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useAuth } from 'contexts/AuthProvider';
import { useFollowersCount } from 'features/Home/hooks/useFollowersCount';
import { useFollowUser } from 'features/User/hooks/useFollowUser';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUserAvatarUrl } from 'utils/user';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type AsideFeedItemProps = {
	header: string;
	description?: string;
};

const AsideFeedItem = ({ header, description }: AsideFeedItemProps) => {
	const { data, status } = useFollowersCount();
	const { mutate } = useFollowUser();
	const { user } = useAuth();
	const [animationParent] = useAutoAnimate<HTMLDivElement>();

	if (!user) {
		return <div>Couldnt get top followed users</div>;
	}
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
		<div className="flex flex-col shadow-md rounded-lg mt-12 p-4 border-2">
			<div className="mb-2">
				<h3 className="uppercase  ">{header}</h3>
				{description && <p className="text-xs text-gray-600">{description}</p>}
			</div>
			<hr />
			<div ref={animationParent} className="flex flex-col gap-3 py-2">
				{data.map(({ id, username, fullname, avatarurl, followers }) => (
					<div className="flex" key={username}>
						<Link className="flex items-center gap-2 group" to={`/users/${id}`}>
							<div className="rounded-xl w-8 h-8">
								<img
									className="rounded-md w-8 h-8 object-cover"
									src={getUserAvatarUrl(avatarurl)}
								/>
							</div>
							<div>
								<p className="group-hover:text-indigo-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
									{fullname || username}
								</p>
								<p className="text-xs text-gray-800">Obserwujących: {followers}</p>
							</div>
						</Link>
						<Button
							onClick={() => handleFollowButtonClick(id)}
							className="rounded-md ml-auto bg-indigo-500 flex justify-center items-center w-8 h-8"
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
