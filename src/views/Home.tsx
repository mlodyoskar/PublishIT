import { useAuth } from 'contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'components/Navigation/Navigation';
import { MainTemplate } from 'templates/MainTemplate';
import { Articles } from 'components/Articles/Articles';

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
    <MainTemplate>
      <h1>Jestes na dashboardzie</h1>
      <Articles />
      <button onClick={handleSignOut} className="bg-indigo-600 p-1 rounded-sm">
        Logout
      </button>
    </MainTemplate>
  );
};

export { Home };
