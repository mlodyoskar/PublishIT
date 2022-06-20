import { BsFillLightningChargeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { NavigationDropdown } from './NavigationDropdown/NavigationDropdown';
import { Button } from 'components/Button/Button';

const Navigation = () => {
  return (
    <nav className="w-full bg-indigo-500 h-[80px] flex items-center justify-center drop-shadow-xl mb-4">
      <div className="flex max-w-7xl w-full h-full justify-between">
        <Link to="/" className=" mb-6 flex items-center  h-full ">
          <BsFillLightningChargeFill
            size="3rem"
            className="text-gray-50 mr-2"
          />
          <p className="text-3xl text-gray-50">PublishIT</p>
        </Link>
        <div className="flex items-center">
          <ul className="flex h-3/5 items-center w-full gap-4">
            <li className="h-full flex items-center">
              <Link
                className="text-gray-50 text-xl py-2 px-3 font-semibold h-full"
                to="/"
              >
                Strona główna
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Link
                className="text-gray-50 text-xl py-2 px-3 font-semibold h-full"
                to="/"
              >
                Zapisane posty
              </Link>
            </li>
            <li className="h-full flex items-center">
              <Button path="articles/new" variant="secondary">
                <p className="font-semibold flex justify-center text-xl">
                  Add new article
                </p>
              </Button>
            </li>
            <li>
              <Menu as="div">
                <div>
                  <Menu.Button className=" bg-gray-50 rounded-full p-0.5 m-auto h-full flex items-center">
                    <img
                      className="rounded-full flex"
                      src="https://i.pravatar.cc/60"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <NavigationDropdown />
                </Transition>
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };
