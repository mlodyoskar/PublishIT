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
		<nav className="fixed z-10 w-full bg-indigo-500 h-[80px] flex items-center justify-center drop-shadow-xl mb-4">
			<div className="flex max-w-7xl w-full h-full justify-between px-4">
				<Link to="/" className=" mb-6 flex items-center  h-full ">
					<BsFillLightningChargeFill size="3rem" className="text-gray-50 mr-2" />
					<p className="text-3xl text-gray-50">PublishIT</p>
				</Link>
				<div className="flex items-center">
					<Hamburger
						isOpen={isOpen}
						handleClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
					/>

					<ul className="hidden md:flex h-3/5 items-center w-full gap-4">
						<li className="h-full flex items-center">
							<NavigationSearch />
						</li>
						<li className="h-full flex items-center">
							<Link
								className="text-indigo-500 hover:text-indigo-800 transition-all flex rounded bg-gray-50 text-xl py-2 px-3 font-semibold h-full"
								to="/bookmarks"
							>
								<BsFillBookmarkFill size="1.4rem" className="m-auto" />
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
							<NavigationDropdown />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export { Navigation };
