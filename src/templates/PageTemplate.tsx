import { MainTemplate } from './MainTemplate';

type PageTemplateProps = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <MainTemplate>
      <h1>Jestes na dashboardzie</h1>
      {children}
    </MainTemplate>
  );
};

export { PageTemplate };
