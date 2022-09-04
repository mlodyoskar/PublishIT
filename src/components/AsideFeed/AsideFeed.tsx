import { AsideFeedItem } from './AsideFeedItem/AsideFeedItem';

const AsideFeed = () => {
	return (
		<aside className="hidden lg:flex flex-col mt-[3.2rem]">
			<AsideFeedItem
				header="Most popular writers"
				description="Check which users are worth watching"
			/>
		</aside>
	);
};

export { AsideFeed };
