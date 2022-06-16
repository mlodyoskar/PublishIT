import { UserType } from './../types/UserType';
import { useAuth } from 'contexts/AuthProvider';
import { useQuery } from 'react-query';
import { supabase } from 'supabase';

const getUser = async (id: string) => {
  const { data: users, error } = await supabase
    .from<UserType>('users')
    .select('*')
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  if (!users) {
    throw new Error('Users not found');
  }

  return users[0];
};

const useUser = () => {
  const { user } = useAuth();

  if (!user) {
    throw new Error("Didn't find user");
  }

  return useQuery('user', () => getUser(user?.id));
};

export { useUser };
