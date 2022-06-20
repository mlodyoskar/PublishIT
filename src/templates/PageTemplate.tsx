import { MainTemplate } from './MainTemplate';

type PageTemplateProps = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <MainTemplate>
      <h1 className="hidden lg:block">Jestes na dashboardzie</h1>
      <section>{children}</section>
      <h1 className="hidden lg:block">Jestes na dashboardzie</h1>
    </MainTemplate>
  );
};

export { PageTemplate };
