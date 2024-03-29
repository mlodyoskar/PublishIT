import cls from 'classnames';
import { Link } from 'react-router-dom';

type ButtonProps = {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary';
	path?: string;
	className?: string;
	disabled?: boolean;
	fullw?: boolean;
	type?: 'submit';
	onClick?: () => void;
};

const variantToClass = {
	primary: 'text-gray-50 bg-indigo-600 hover:bg-indigo-700 shadow-glow-primary',
	secondary:
		'text-indigo-600 bg-gray-50 hover:bg-gray-200 shadow-glow-secondary',
};

const baseStyles =
	'flex items-center justify-center rounded-md hover:shadow-none ease-in-out duration-300  px-2 py-1.5 h-full disabled:bg-gray-500 disabled:text-white disabled:shadow-none';

const Button = ({
	children,
	variant = 'primary',
	fullw,
	disabled,
	className,
	path,
	type,
	onClick,
}: ButtonProps) =>
	path ? (
		<Link
			to={path}
			className={cls(
				baseStyles,
				{ 'w-full': fullw },
				variantToClass[variant],
				className
			)}
		>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick}
			disabled={disabled}
			className={cls(
				baseStyles,
				{ 'w-full': fullw },
				variantToClass[variant],
				className
			)}
			type={type}
		>
			{children}
		</button>
	);

export { Button };
