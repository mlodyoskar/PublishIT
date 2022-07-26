import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { showErrorToast } from 'utils/toast';

export type InsertUserType = {
	id?: string;
	username: string;
	email: string;
	password: string;
};

const insertUser = async ({ email, username, password }: InsertUserType) => {
	const { data: selectedUser, error } = await supabase
		.from<InsertUserType>('users')
		.select('*')
		.eq('email', email)
		.maybeSingle();

	if (error) {
		throw new Error(error.message);
	}

	if (selectedUser) {
		showErrorToast('This email address is already being used');
		throw new Error('This email address is already being used');
	}

	const { user, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (signUpError) {
		throw new Error(signUpError.message);
	}

	const { data: insertedUser, error: insertError } = await supabase
		.from<InsertUserType>('users')
		.insert([
			{
				id: user?.id,
				username,
				email,
			},
		]);

	if (insertError) {
		throw new Error(insertError.message);
	}

	return insertedUser;
};

const useCreateUser = () => {
	return useMutation((userData: InsertUserType) => insertUser(userData));
};

export { useCreateUser };
