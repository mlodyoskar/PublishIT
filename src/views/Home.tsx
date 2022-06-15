import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from 'templates/PageTemplate';
import { ArticleList } from 'components/ArticleList/ArticleList';
import { supabase } from 'supabase';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      alert('Error ocured while singing out');
    } else {
      navigate('/login');
    }
  };

  return (
    <PageTemplate>
      <ArticleList />
      <button onClick={handleSignOut} className="bg-indigo-600 p-1 rounded-sm">
        Logout
      </button>
    </PageTemplate>
  );
};

export { Home };
