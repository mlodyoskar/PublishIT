import { Link } from 'react-router-dom';

type AsideFeedItemProps = {
  header: string;
  description: string;
};

const fakeDataUsers = [
  {
    name: 'Jakub Bryska',
    followers: 25,
  },
  {
    name: 'Oskar Puchalski',
    followers: 16,
  },
  {
    name: 'Basia Jurek',
    followers: 8,
  },
];

const AsideFeedItem = ({ header, description }: AsideFeedItemProps) => {
  return (
    <div className="flex flex-col shadow-md rounded-md mt-12 p-4 border-2">
      <h3 className="uppercase text-indigo-700 ">{header}</h3>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <hr />
      <div className="flex flex-col gap-2">
        {fakeDataUsers.map(({ name, followers }) => (
          <Link to={`users/${name}`} key={name}>
            <p>{name}</p>
            <p>Obserwujących: {followers}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { AsideFeedItem };
