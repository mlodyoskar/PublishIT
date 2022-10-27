import { useLoggedInUser } from 'features/User/hooks/useLoggedInUser';
import { getIfIsFollowingAlready } from './useFollowUser';
import { useQuery } from 'react-query';

const useIsFollwingAlready = (followerId: string | undefined) => {
	const user = useLoggedInUser();

	if (!followerId) {
		throw new Error('User id wasnt provided');
	}
	return useQuery(['isFollowingAlready', followerId], () =>
		getIfIsFollowingAlready(followerId, user.id)
	);
};

export { useIsFollwingAlready };
