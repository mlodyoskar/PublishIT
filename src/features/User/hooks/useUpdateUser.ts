import { UserType } from './../../../types/UserType';
import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { v4 as uuidv4 } from 'uuid';
import { queryClient } from 'utils/queryClient';

export type InsertUserType = {
	id: string;
	fullName: string;
	bio?: string;
	imageFile?: File;
};

const updateUserDetails = async ({
	id,
	fullName,
	bio,
	imageFile,
}: InsertUserType) => {
	const { data: updatedUser, error: updateError } = await supabase
		.from<UserType>('users')
		.update({ bio, fullName })
		.match({ id });

	if (updateError) {
		throw new Error(updateError.message);
	}

	if (imageFile) {
		const uuid = uuidv4();

		await supabase
			.from<UserType>('users')
			.update({ avatarUrl: uuid })
			.match({ id });

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
