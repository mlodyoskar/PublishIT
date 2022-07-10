import { UserType } from './../types/UserType';
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

const useUser = (id: string) => {
  return useQuery('user', () => getUser(id));
};

export { useUser };
