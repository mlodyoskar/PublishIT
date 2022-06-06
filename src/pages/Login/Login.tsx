import { useAuth } from '../../contexts/Auth';

const Login = () => {
  const context = useAuth();
  console.log(context);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1>Zaloguj sie wariat</h1>
      <button>Zaloguj</button>
    </div>
  );
};

export { Login };
