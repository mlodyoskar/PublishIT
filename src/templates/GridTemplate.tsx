type GridTemplateProps = {
	children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
	return (
		<section className="m-auto flex max-w-7xl gap-4 lg:grid lg:grid-cols-[3fr_1fr]">
			{children}
		</section>
	);
};

export { GridTemplate };
