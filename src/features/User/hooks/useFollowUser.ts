import { showErrorToast } from 'utils/toast';
import { useAuth } from 'contexts/AuthProvider';
import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { queryClient } from 'utils/queryClient';

export type InsertFollowType = {
	user_id: string;
	follower_id: string;
};

export const getIfIsFollowingAlready = async (
	user_id: string,
	follower_id: string
) => {
	const { data: isFollwoingAlready } = await supabase
		.from<InsertFollowType>('userFollowers')
		.select('*')
		.match({ user_id: user_id, follower_id: follower_id });

	if (!isFollwoingAlready) {
		throw new Error(
			'There was error when fetching if you are already following this person'
		);
	}

	console.log(isFollwoingAlready);

	const isFollowingAlready = isFollwoingAlready.length > 0;

	return isFollowingAlready;
};

const insertFollow = async ({ user_id, follower_id }: InsertFollowType) => {
	const followingAlready = await getIfIsFollowingAlready(user_id, follower_id);

	if (followingAlready) {
		const { data: deletedFollower, error: deleteError } = await supabase
			.from<InsertFollowType>('userFollowers')
			.delete()
			.match({ follower_id: follower_id, user_id: user_id });

		console.log(deletedFollower);

		if (deleteError) {
			throw new Error(deleteError.message);
		}
	} else {
		const { data: insertedFollow, error: insertError } = await supabase
			.from<InsertFollowType>('userFollowers')
			.insert({
				user_id,
				follower_id,
			});

		if (insertError) {
			throw new Error(insertError.message);
		}

		return insertedFollow;
	}
};

const useFollowUser = () => {
	return useMutation(
		(followData: InsertFollowType) => insertFollow(followData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('followers');
				queryClient.invalidateQueries('isFollowingAlready');
				queryClient.invalidateQueries('userDetails');
			},
		}
	);
};

export { useFollowUser };
