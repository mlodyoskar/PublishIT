import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CommentType } from 'types/CommentType';
import { formatDate } from 'utils/date';
import { getUserAvatarUrl } from 'utils/user';

const Comment = ({
  commentData: {
    id,
    body,
    created_at,
    user: { fullName, username, avatarUrl },
  },
}: {
  commentData: CommentType;
}) => {
  const date = formatDate(created_at);
  return (
    <div
      key={id}
      className="border-b-2 border-indigo-400 my-2 p-2 flex gap-2 relative"
    >
      <div className="w-1/12">
        <img
          className="w-12 h-12 rounded-xl object-cover"
          src={`${getUserAvatarUrl(avatarUrl)}`}
        />
      </div>
      <div className="w-10/12 relative">
        <p className="text-sm text-indigo-600 mb-2">
          <Link className="hover:text-indigo-900" to={`/users/${username}`}>
            {fullName}
          </Link>{' '}
          | <span>{date}</span>
        </p>

        <p className="text-justify mb-2">{body}</p>
      </div>
      <button className="absolute right-4 top-2 text-indigo-300 hover:text-indigo-800">
        <BsThreeDots size="1.2rem" />
      </button>
    </div>
  );
};

export { Comment };
