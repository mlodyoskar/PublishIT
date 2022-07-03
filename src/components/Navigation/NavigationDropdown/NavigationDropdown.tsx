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
  return (
    <Dropdown
      menuButtonClassName="bg-gray-50 rounded-full p-0.5 m-auto h-full flex items-center"
      dropdownItems={dropdownItems}
    >
      <img className="rounded-full flex" src="https://i.pravatar.cc/60" />
    </Dropdown>
  );
};

export { NavigationDropdown };
