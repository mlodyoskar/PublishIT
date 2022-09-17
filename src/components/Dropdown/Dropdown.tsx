import { Menu, Transition } from '@headlessui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type DropdownProps = {
	dropdownItems: dropdownItemsProps[];
	dropdownSide: 'left' | 'right';
	children: ReactNode;
	menuButtonClassName?: string;
};

export type dropdownItemsProps = {
	text: string;
	to?: string;
	handleClick?: () => void;
};

const Dropdown = ({
	dropdownItems,
	menuButtonClassName,
	children,
	dropdownSide,
}: DropdownProps) => {
	return (
		<Menu as="div">
			<Menu.Button data-testid="user-button" className={menuButtonClassName}>
				{children}
			</Menu.Button>
			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					className={`absolute w-48 ${dropdownSide}-0 mt-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
				>
					{dropdownItems.map(({ text, to, handleClick }) => (
						<div key={text} className="p-1">
							<Menu.Item>
								{({ active }: { active: boolean }) =>
									to ? (
										<Link
											to={to}
											className={
												active
													? 'w-full px-1 py-1 bg-indigo-500 text-gray-50 rounded-md inline-block text-center font-semibold'
													: 'w-full px-1 py-1 inline-block text-center'
											}
										>
											{text}
										</Link>
									) : (
										<button
											onClick={handleClick}
											className={
												active
													? 'w-full px-1 py-1 bg-indigo-500 text-gray-50 rounded-md inline-block text-center font-semibold'
													: 'w-full px-1 py-1 inline-block text-center'
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
			</Transition>
		</Menu>
	);
};

export { Dropdown };
