import { getIfIsFollowingAlready } from './useFollowUser';
import { useAuth } from 'contexts/AuthProvider';
import { useQuery } from 'react-query';

const useIsFollwingAlready = (followerId: string | undefined) => {
	const { user } = useAuth();
	if (!user) {
		throw new Error('Cannot find logged user');
	}
	if (!followerId) {
		throw new Error('User id wasnt provided');
	}
	return useQuery(['isFollowingAlready', followerId], () =>
		getIfIsFollowingAlready(followerId, user.id)
	);
};

export { useIsFollwingAlready };
