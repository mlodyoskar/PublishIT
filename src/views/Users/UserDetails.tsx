import { ArticleList } from 'components/ArticleList/ArticleList';
import { LoaderSpinner } from 'components/Spinner/Spinner';
import { useUserDetails } from 'hooks/useUserDeatils';
import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { getUserAvatarUrl } from 'utils/user';
import { ArticleListing } from 'views/Articles/ArticleListing';

const UserDetails = () => {
  const { id } = useParams();
  const { data: userDetails, status } = useUserDetails(id);

  if (status === 'loading') {
    return (
      <PageTemplate>
        <LoaderSpinner />
      </PageTemplate>
    );
  }

  if (!userDetails) {
    return (
      <PageTemplate>
        <div>User want found</div>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <div className="rounded-md mt-12 flex gap-6  px-4 shadow-lg border-2 py-4">
        <div className="">
          <img
            className="w-24 h-24 rounded-md object-cover"
            src={getUserAvatarUrl(userDetails.avatarUrl)}
          />
        </div>
        <div className="w-3/4">
          <h1 className="text-gray-900 text-3xl">
            {userDetails.fullName || userDetails.username}
          </h1>
          {userDetails.fullName && (
            <span className="text-gray-700 text-sm">
              @{userDetails.username}
            </span>
          )}

          <p>
            {userDetails.bio ? userDetails.bio : 'User didnt provide bio yet'}
          </p>
          <div className="flex gap-6 pt-4">
            <p className="text-gray-600 font-medium">
              Followers: {userDetails.followersCount}
            </p>
            <p className="text-gray-600 font-medium">
              Followed by: {userDetails.followedByCount}
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export { UserDetails };
