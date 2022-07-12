import { useAuth } from 'contexts/AuthProvider';
import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { showErrorToast } from 'utils/toast';

export type InsertUserType = {
  username: string;
  email: string;
  password: string;
};

const insertUser = async ({ email, username, password }: InsertUserType) => {
  const { data: user, error } = await supabase
    .from<InsertUserType>('users')
    .select('*')
    .eq('email', email)
    .single();

  if (user) {
    showErrorToast('This email address is already being used');
    throw new Error('This email address is already being used');
  }

  supabase.auth.signUp({ email, password });

  const { data: insertedArticle, error: insertError } = await supabase
    .from<InsertUserType>('users')
    .insert([
      {
        username,
      },
    ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return insertedArticle;
};

const useCreateUser = () => {
  return useMutation((userData: InsertUserType) => insertUser(userData));
};

export { useCreateUser };
