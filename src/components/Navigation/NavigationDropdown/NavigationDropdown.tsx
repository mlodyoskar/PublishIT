import { Menu } from '@headlessui/react';
import { useAuth } from 'contexts/AuthProvider';
import { useUser } from 'hooks/useUser';
import { Link } from 'react-router-dom';

type dropdownItemsProps = {
  text: string;
  to?: string;
  handleClick?: () => void;
};

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
    <Menu.Items className="absolute right-0 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      {dropdownItems.map(({ text, to, handleClick }) => (
        <div key={text} className="px-1 py-1">
          <Menu.Item>
            {({ active }: { active: boolean }) =>
              to ? (
                <Link
                  to={to}
                  className={
                    active
                      ? 'w-full py-1 bg-indigo-500 text-gray-50 rounded-md inline-block text-center font-semibold'
                      : 'w-full py-1 inline-block text-center'
                  }
                >
                  {text}
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className={
                    active
                      ? 'w-full py-1 bg-indigo-500 text-gray-50 rounded-md inline-block text-center font-semibold'
                      : 'w-full py-1 inline-block text-center'
                  }
                >
                  {text}
                </button>
              )
            }
          </Menu.Item>
        </div>
      ))}
    </Menu.Items>
  );
};

export { NavigationDropdown };
