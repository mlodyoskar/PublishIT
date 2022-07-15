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
			className="flex items-center gap-2 group"
			to={`users/${username}`}
			key={username}
		>
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
			<Button className="rounded-md ml-auto bg-indigo-500 flex justify-center items-center w-8 h-8">
				<AiOutlineUserAdd />
			</Button>
		</Link>
	));
};

export { TopFollowersFeed };
