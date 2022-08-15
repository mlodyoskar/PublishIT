import { useMutation } from 'react-query';
import { supabase } from 'supabase';

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
		.from<InsertUserType>('users')
		.update({ bio, fullName })
		.match({ id });

	if (updateError) {
		throw new Error(updateError.message);
	}

	if (imageFile) {
		const { error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(id, imageFile);

		if (uploadError) {
			console.log(uploadError);
			throw new Error(uploadError.message);
		}
	}

	return updatedUser;
};

const useUpdateUser = () => {
	return useMutation((userData: InsertUserType) => updateUserDetails(userData));
};

export { useUpdateUser };
