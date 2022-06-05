import {
  ApiError,
  AuthSession,
  User,
  UserCredentials,
} from '@supabase/supabase-js';
import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface ContextValue {
  signUp: (data: UserCredentials) => Promise<AuthSession>;
  signIn: (data: UserCredentials) => Promise<AuthSession>;
  signOut: () => Promise<{ error: ApiError | null }>;
  user: User | null;
}

const AuthContext = React.createContext<ContextValue | null>(null);

type AuthProviderProps = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: (data: UserCredentials) => supabase.auth.signUp(data),
    signIn: (data: UserCredentials) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
