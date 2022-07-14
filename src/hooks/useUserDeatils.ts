import { UserType } from './../types/UserType';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

type UserFollowersType = {
	user_id: string;
	follower_id: string;
};

const getUserDatails = async (id: string) => {
	const { data: followers, error: followersError } = await supabase
		.from<UserFollowersType>('userFollowers')
		.select('user_id, follower_id')
		.eq('follower_id', id);

	const { data: followedBy, error: followedByError } = await supabase
		.from<UserFollowersType>('userFollowers')
		.select('user_id, follower_id')
		.eq('user_id', id);

	const { data: userDetailsSelect, error: userDetailsError } = await supabase
		.from<UserType>('users')
		.select('*')
		.eq('id', id)
		.maybeSingle();

	if (followersError || followedByError || userDetailsError) {
		throw new Error(followersError?.message || followedByError?.message);
	}
	if (!followers || !followedBy || !userDetailsSelect) {
		throw new Error('Followers count, or user  not found');
	}

	const userDetails = {
		followersCount: followers.length,
		followedByCount: followedBy.length,
		fullName: userDetailsSelect.fullName,
		username: userDetailsSelect.username,
		avatarUrl: userDetailsSelect.avatarUrl,
		bio: userDetailsSelect.bio,
	};

	return userDetails;
};

const useUserDetails = (id: string | undefined) => {
	if (id === undefined) {
		throw new Error("Id wasn't provided");
	}
	return useQuery(['userDetails', id], () => getUserDatails(id));
};

export { useUserDetails };
