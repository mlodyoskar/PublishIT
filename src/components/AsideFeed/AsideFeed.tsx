import { AsideFeedItem } from './AsideFeedItem/AsideFeedItem';

const AsideFeed = () => {
  return (
    <aside className="flex flex-col">
      <AsideFeedItem
        header="Kogo obserwować"
        description="Sprawdź których użytkowników warto obserwować"
      />
    </aside>
  );
};

export { AsideFeed };
