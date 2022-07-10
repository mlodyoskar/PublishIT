import { useParams } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';

const UserDetails = () => {
  const { username } = useParams();

  return (
    <PageTemplate>
      <h1>{username}</h1>
    </PageTemplate>
  );
};

export { UserDetails };
