import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';
import { useAuth } from 'contexts/AuthProvider';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

export type FollowersCountType = {
	id: string;
	username: string;
	fullname: string;
	avatarurl: string;
	followers: number;
};

interface userFollowersType {
	id: string;
	user_id: string;
	follower_id: string;
}

const getTopFollowersCount = async (userId: string) => {
	const { data: followers, error } = await supabase.rpc<FollowersCountType>(
		'followers_count'
	);

	if (error) {
		throw new Error(error.message);
	}
	if (!followers) {
		throw new Error('Followes not found');
	}

	const { data: userFollowers, error: userFollowersError } = await supabase
		.from<userFollowersType>('userFollowers')
		.select('user_id')
		.eq('follower_id', userId);

	if (userFollowersError) {
		throw new Error(userFollowersError.message);
	}
	if (!userFollowers) {
		throw new Error('Articles not found');
	}

	// Here we take out logged user and user he followes already
	//Cannot be done in backend because its supabase
	const followersUserIds = userFollowers.map((user) => user.user_id);
	const usersIdsToFilterOut = [userId, ...followersUserIds];

	const followersWithoutLoggedUser = followers.filter((follower) => {
		return !usersIdsToFilterOut.includes(follower.id);
	});

	return followersWithoutLoggedUser;
};

const useFollowersCount = () => {
	const user = useLoggedInUser();

	return useQuery('followers', () => getTopFollowersCount(user.id));
};

export { useFollowersCount };
