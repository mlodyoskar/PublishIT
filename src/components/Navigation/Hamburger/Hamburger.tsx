import cls from 'classnames';

const hamburgerSpanStyles =
	'block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out';

type HamburgerProps = {
	handleClick: () => void;
	isOpen: boolean;
};

const Hamburger = ({ handleClick, isOpen }: HamburgerProps) => {
	return (
		<button
			className="relative h-12 w-12 rounded bg-white text-indigo-500 focus:outline-none md:hidden"
			onClick={handleClick}
		>
			<span className="sr-only">Open main menu</span>
			<div className="absolute left-1/2 top-1/2 flex w-5 -translate-x-1/2 -translate-y-1/2   transform  items-center justify-center">
				<span
					aria-hidden="true"
					className={cls(hamburgerSpanStyles, {
						'rotate-45 ': isOpen,
						'-translate-y-2': !isOpen,
					})}
				></span>
				<span
					aria-hidden="true"
					className={cls(hamburgerSpanStyles, { 'opacity-0': isOpen })}
				></span>
				<span
					aria-hidden="true"
					className={cls(hamburgerSpanStyles, {
						'-rotate-45 ': isOpen,
						'translate-y-2': !isOpen,
					})}
				></span>
			</div>
		</button>
	);
};

export { Hamburger };
