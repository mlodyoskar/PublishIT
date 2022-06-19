import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { ArticleList } from 'components/ArticleList/ArticleList';

const Home = () => {
  return (
    <PageTemplate>
      <ArticleList />
    </PageTemplate>
  );
};

export { Home };
