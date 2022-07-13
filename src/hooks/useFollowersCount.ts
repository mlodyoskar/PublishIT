import { useQuery } from 'react-query';
import { supabase } from 'supabase';

export type FollowersCountType = {
  id: string;
  username: string;
  fullname: string;
  avatarurl: string;
  followers: number;
};

const getTopFollowersCount = async () => {
  const { data: followers, error } = await supabase.rpc<FollowersCountType>(
    'followers_count'
  );

  if (error) {
    throw new Error(error.message);
  }
  if (!followers) {
    throw new Error('Followes not found');
  }
  return followers;
};

const useFollowersCount = () => {
  return useQuery('followers', () => getTopFollowersCount());
};

export { useFollowersCount };
