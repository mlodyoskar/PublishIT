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
			className="md:hidden text-indigo-500 w-12 h-12 relative focus:outline-none bg-white rounded"
			onClick={handleClick}
		>
			<span className="sr-only">Open main menu</span>
			<div className="flex items-center justify-center w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
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
