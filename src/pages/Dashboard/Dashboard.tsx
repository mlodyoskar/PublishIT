import { useAuth } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { signOut } = useAuth();
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
    <>
      <h1>Jestes na dashboardzie</h1>
      <button onClick={handleSignOut} className="bg-indigo-600 p-1 rounded-sm">
        Logout
      </button>
    </>
  );
};

export { Dashboard };
