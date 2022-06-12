type GridTemplateProps = {
  children: React.ReactNode;
};

const GridTemplate = ({ children }: GridTemplateProps) => {
  return (
    <section className="grid grid-cols-[1fr_2fr_1fr] gap-4 max-w-7xl m-auto">
      {children}
    </section>
  );
};

export { GridTemplate };
