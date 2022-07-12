import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useUserUsername } from 'hooks/useUser';
import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getUserAvatarUrl } from 'utils/user';

const UserDetails = () => {
  const { username } = useParams();
  const { data: user, status } = useUserUsername(username);
  console.log(user);
  if (status === 'loading') {
    return (
      <PageTemplate>
        <LoaderSpinner />
      </PageTemplate>
    );
  }

  if (!user) {
    return (
      <PageTemplate>
        <div>User want found</div>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <div className="rounded-md mt-12 flex gap-6 items-center px-4 shadow-lg border-2 py-2">
        <div className="">
          <img
            className="w-24 h-24 rounded-md object-cover"
            src={getUserAvatarUrl(user.avatarUrl)}
          />
        </div>
        <div className="w-3/4">
          <h1 className="text-gray-900 text-3xl">{user.fullName}</h1>
          <span className="text-gray-700 text-sm">@{user.username}</span>

          <p>{user.bio ? user.bio : 'User didnt provide bio yet'}</p>
        </div>
      </div>
    </PageTemplate>
  );
};

export { UserDetails };
