import { GridTemplate } from './GridTemplate';

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  return <GridTemplate>{children}</GridTemplate>;
};

export { MainTemplate };
