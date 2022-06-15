import { useQuery } from 'react-query';
import { supabase } from 'supabase';

const getUser = async (id: string) => {
  const { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error(error.message);
  }
  if (!users) {
    throw new Error('Users not found');
  }
  return users;
};

const useUser = (id: string) => {
  return useQuery('user', () => getUser(id));
};

export { useUser };
