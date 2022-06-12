import { Navigation } from 'components/Navigation/Navigation';
import { GridTemplate } from './GridTemplate';

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <>
      <Navigation />
      <GridTemplate>{children}</GridTemplate>
    </>
  );
};

export { MainTemplate };
