type GridTemplateProps = {
  children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <section className="grid grid-cols-[1fr_3fr_1fr] gap-4 max-w-7xl m-auto">
      {children}
    </section>
  );
};

export { GridTemplate };
