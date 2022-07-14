import {
	ApiError,
	AuthSession,
	User,
	UserCredentials,
} from '@supabase/supabase-js';
import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

type AuthProviderProps = { children: React.ReactNode };
type AuthPromises = {
	user: User | null;
	session: AuthSession | null;
	error: ApiError | null;
};

interface ContextValue {
	signUp: (data: UserCredentials) => Promise<AuthPromises>;
	signIn: (data: UserCredentials) => Promise<AuthPromises>;
	signInWithTwitter: () => Promise<AuthPromises>;
	signOut: () => Promise<{ error: ApiError | null }>;
	user: User | null;
}

const AuthContext = React.createContext<ContextValue | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
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
		signInWithTwitter: () => supabase.auth.signIn({ provider: 'twitter' }),
		signOut: () => supabase.auth.signOut(),
		user,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within a AuthProvider');
	}

	return context;
};

export { AuthProvider, useAuth };
