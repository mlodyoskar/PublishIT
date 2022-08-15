import { Dropdown, dropdownItemsProps } from 'components/Dropdown/Dropdown';
import { useAuth } from 'contexts/AuthProvider';
import { useUser } from 'hooks/api/useUser';
import { getUserAvatarUrl } from 'utils/user';

const NavigationDropdown = () => {
	const { user: loggedUser, signOut } = useAuth();

	if (!loggedUser) {
		throw new Error("Didn't find logged user");
	}
	const { data: user } = useUser(loggedUser.id);

	const dropdownItems: dropdownItemsProps[] = [
		{
			text: 'My profile',
			to: `/users/${user?.id}`,
		},
		{
			text: 'Edit profile',
			to: `/users/${user?.id}/edit`,
		},
		{
			text: 'Logout',
			handleClick: () => {
				signOut();
			},
		},
	];
	return (
		<Dropdown
			dropdownSide="right"
			menuButtonClassName="bg-gray-50 rounded-full p-0.5 m-auto h-full flex items-center"
			dropdownItems={dropdownItems}
		>
			<img
				className="rounded-full w-12 h-12 object-cover flex"
				src={getUserAvatarUrl(user?.avatarUrl || 'placeholder')}
			/>
		</Dropdown>
	);
};

export { NavigationDropdown };
