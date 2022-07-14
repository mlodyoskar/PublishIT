import { Button } from 'components/Button/Button';

const PageNotFound = () => {
	return (
		<section className="flex flex-col gap-8 items-center justify-center my-40 mx-4">
			<h1 className="text-9xl text-center">404</h1>
			<p className="text-3xl text-center">
				The page you were looking for was moved or {"doesn't"} exist 😱
			</p>
			<Button path="/">
				<p className="text-2xl p-2">Go back to homepage</p>
			</Button>
		</section>
	);
};

export { PageNotFound };
