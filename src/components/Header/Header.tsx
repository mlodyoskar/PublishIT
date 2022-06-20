type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <h1 className="text-3xl mb-4">{children}</h1>;
};

export { Header };
