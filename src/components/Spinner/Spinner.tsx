import ClipLoader from 'react-spinners/ClipLoader';

type LoaderSpinnerProps = {
	size?: number;
};

const LoaderSpinner = ({ size = 150 }: LoaderSpinnerProps) => {
	return (
		<div className="m-auto flex h-full items-center justify-center">
			<ClipLoader color="#6366f1" size={size} />;
		</div>
	);
};

export { LoaderSpinner };
