import { BsFillBookmarkFill, BsFillLightningChargeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { NavigationDropdown } from './NavigationDropdown/NavigationDropdown';
import { Button } from 'components/Button/Button';
import { useState } from 'react';
import { Hamburger } from './Hamburger/Hamburger';
import { NavigationSearch } from './NavigationSearch/NavigationSearch';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed z-10 mb-4 flex h-[80px] w-full items-center justify-center bg-indigo-500 drop-shadow-xl">
			<div className="flex h-full w-full max-w-7xl justify-between px-4">
				<Link to="/" className=" mb-6 flex h-full  items-center ">
					<BsFillLightningChargeFill size="3rem" className="mr-2 text-gray-50" />
					<p className="text-3xl text-gray-50">PublishIT</p>
				</Link>
				<div className="flex items-center">
					<Hamburger
						isOpen={isOpen}
						handleClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
					/>

					<ul className="hidden h-3/5 w-full items-center gap-4 md:flex">
						<li className="flex h-full items-center">
							<NavigationSearch />
						</li>
						<li className="flex h-full items-center">
							<Link
								className="flex h-full rounded bg-gray-50 py-2 px-3 text-xl font-semibold text-indigo-500 transition-all hover:text-indigo-800"
								to="/bookmarks"
							>
								<BsFillBookmarkFill size="1.4rem" className="m-auto" />
							</Link>
						</li>
						<li className="flex h-full items-center">
							<Button path="articles/new" variant="secondary">
								<p className="flex justify-center text-xl font-semibold">
									Add new article
								</p>
							</Button>
						</li>
						<li>
							<NavigationDropdown />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export { Navigation };
