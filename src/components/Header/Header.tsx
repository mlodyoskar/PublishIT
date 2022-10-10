type HeaderProps = {
	children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
	return <h1 className="mb-4 text-3xl">{children}</h1>;
};

export { Header };
