import { AsideFeedItem } from './AsideFeedItem/AsideFeedItem';

const AsideFeed = () => {
	return (
		<aside className="hidden lg:flex flex-col mt-[3.2rem]">
			<AsideFeedItem
				header="Kogo obserwować"
				description="Sprawdź których użytkowników warto obserwować"
			/>
		</aside>
	);
};

export { AsideFeed };
