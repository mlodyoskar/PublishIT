import { AsideFeed } from 'components/AsideFeed/AsideFeed';
import { MainTemplate } from './MainTemplate';

type PageTemplateProps = {
	children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
	return (
		<MainTemplate>
			<section>{children}</section>
			<AsideFeed />
		</MainTemplate>
	);
};

export { PageTemplate };
