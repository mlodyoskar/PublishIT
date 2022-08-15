import { UserType } from './../../../types/UserType';
import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { v4 as uuidv4 } from 'uuid';
import { queryClient } from 'utils/queryClient';

export type InsertUserType = {
	id: string;
	username: string;
	fullName: string;
	bio?: string;
	imageFile?: File;
};

const updateUserDetails = async ({
	id,
	username,
	fullName,
	bio,
	imageFile,
}: InsertUserType) => {
	const uuid = uuidv4();
	const { data: updatedUser, error: updateError } = await supabase
		.from<UserType>('users')
		.update({ bio, fullName, avatarUrl: uuid })
		.match({ id });

	if (updateError) {
		throw new Error(updateError.message);
	}

	if (imageFile) {
		const { error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(uuid, imageFile);

		if (uploadError) {
			throw new Error(uploadError.message);
		}
	}

	return updatedUser;
};

const useUpdateUser = () => {
	return useMutation((userData: InsertUserType) => updateUserDetails(userData), {
		onSuccess: () => {
			queryClient.invalidateQueries('user');
		},
	});
};

export { useUpdateUser };
