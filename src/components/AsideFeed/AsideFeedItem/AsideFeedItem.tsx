import { Button } from 'components/Button/Button';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useFollowersCount } from 'hooks/useFollowersCount';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getUserAvatarUrl } from 'utils/user';

type AsideFeedItemProps = {
  header: string;
  description?: string;
};

const AsideFeedItem = ({ header, description }: AsideFeedItemProps) => {
  const { data, status } = useFollowersCount();

  if (status === 'loading') {
    return <LoaderSpinner />;
  }

  if (!data) {
    return <div>Couldnt get top followed users</div>;
  }

  return (
    <div className="flex flex-col shadow-md rounded-lg mt-12 p-4 border-2">
      <div className="mb-2">
        <h3 className="uppercase  ">{header}</h3>
        {description && <p className="text-xs text-gray-600">{description}</p>}
      </div>
      <hr />
      <div className="flex flex-col gap-3 py-2">
        {data.map(({ username, fullname, avatarurl, followers }) => (
          <Link
            className="flex items-center gap-2 group"
            to={`/users/${username}`}
            key={username}
          >
            <div className="rounded-xl w-8 h-8">
              <img
                className="rounded-md w-8 h-8 object-cover"
                src={getUserAvatarUrl(avatarurl)}
              />
            </div>
            <div>
              <p className="group-hover:text-indigo-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {fullname || username}
              </p>
              <p className="text-xs text-gray-800">
                Obserwujących: {followers}
              </p>
            </div>
            <Button className="rounded-md ml-auto bg-indigo-500 flex justify-center items-center w-8 h-8">
              <AiOutlineUserAdd />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { AsideFeedItem };
