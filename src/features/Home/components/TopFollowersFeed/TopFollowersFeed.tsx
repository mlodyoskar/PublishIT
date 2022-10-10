import { Button } from 'components/Button/Button';
import { FollowersCountType } from 'features/Home/hooks/useFollowersCount';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUserAvatarUrl } from 'utils/user';

type TopFollowersFeedProps = {
	data: FollowersCountType[];
};

const TopFollowersFeed = ({ data }: TopFollowersFeedProps) => {
	return data.map(({ username, fullname, avatarurl, followers }) => (
		<Link
			className="group flex items-center gap-2"
			to={`users/${username}`}
			key={username}
		>
			<div className="h-8 w-8 rounded-xl">
				<img
					className="h-8 w-8 rounded-md object-cover"
					src={getUserAvatarUrl(avatarurl)}
				/>
			</div>
			<div>
				<p className="overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:text-indigo-700">
					{fullname || username}
				</p>
				<p className="text-xs text-gray-800">Obserwujących: {followers}</p>
			</div>
			<Button className="ml-auto flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500">
				<AiOutlineUserAdd />
			</Button>
		</Link>
	));
};

export { TopFollowersFeed };
