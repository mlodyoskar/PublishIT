import { AsideFeed } from 'components/AsideFeed/AsideFeed';
import { MainTemplate } from './MainTemplate';

type PageTemplateProps = {
	children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
	return (
		<MainTemplate>
			<section className="w-full mt-24 px-4">{children}</section>
			<AsideFeed />
		</MainTemplate>
	);
};

export { PageTemplate };
