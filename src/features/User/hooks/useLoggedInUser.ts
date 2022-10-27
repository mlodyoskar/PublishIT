import { useAuth } from 'contexts/AuthProvider';

export const useLoggedInUser = () => {
	const authData = useAuth();
	if (!authData.user) {
		throw new Error('User was not found');
	} else {
		return authData.user;
	}
};
