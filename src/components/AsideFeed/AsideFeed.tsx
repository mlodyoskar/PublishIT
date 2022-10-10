import { AsideFeedItem } from './AsideFeedItem/AsideFeedItem';

const AsideFeed = () => {
	return (
		<aside className="mt-[148px] hidden flex-col lg:flex ">
			<AsideFeedItem
				header="Most popular writers"
				description="Check which users are worth watching"
			/>
		</aside>
	);
};

export { AsideFeed };
