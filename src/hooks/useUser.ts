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
  return useQuery(['user', id], () => getUser(id));
};

const getUserByUsername = async (username: string) => {
  const { data: users, error } = await supabase
    .from<UserType>('users')
    .select('*')
    .eq('username', username);

  if (error) {
    throw new Error(error.message);
  }
  if (!users) {
    throw new Error('Users not found');
  }

  return users[0];
};

const useUserUsername = (username: string | undefined) => {
  if (!username) {
    throw new Error("Users username wasn't given");
  }

  return useQuery(['user', username], () => getUserByUsername(username));
};

export { useUser, useUserUsername };
