import { Dropdown, dropdownItemsProps } from 'components/Dropdown/Dropdown';
import { useAuth } from 'contexts/AuthProvider';
import { useUser } from 'hooks/useUser';

const NavigationDropdown = () => {
  const { signOut } = useAuth();
  const { data } = useUser();

  const dropdownItems: dropdownItemsProps[] = [
    {
      text: 'My profile',
      to: `/users/${data?.username}`,
    },
    {
      text: 'Settings',
      to: '/settings',
    },
    {
      text: 'Logout',
      handleClick: () => {
        signOut();
      },
    },
  ];
  return <Dropdown dropdownItems={dropdownItems} />;
};

export { NavigationDropdown };
