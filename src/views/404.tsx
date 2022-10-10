import { Button } from 'components/Button/Button';

const PageNotFound = () => {
	return (
		<section className="my-40 mx-4 flex flex-col items-center justify-center gap-8">
			<h1 className="text-center text-9xl">404</h1>
			<p className="text-center text-3xl">
				The page you were looking for was moved or {"doesn't"} exist 😱
			</p>
			<Button path="/">
				<p className="p-2 text-2xl">Go back to homepage</p>
			</Button>
		</section>
	);
};

export { PageNotFound };
