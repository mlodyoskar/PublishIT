import { useMutation } from 'react-query';
import { supabase } from 'supabase';

export type InsertUserType = {
	id: string;
	fullName: string;
	bio?: string;
};

const updateUserDetails = async ({ id, fullName, bio }: InsertUserType) => {
	const { data: updatedUser, error: updateError } = await supabase
		.from<InsertUserType>('users')
		.update({ bio, fullName })
		.match({ id: '20d2c25c-299f-4f1b-a5d7-83505273a098' });

	if (updateError) {
		throw new Error(updateError.message);
	}

	// if (imageFile) {
	// 	const { error: uploadError } = await supabase.storage
	// 		.from('article-image')
	// 		.upload(slug, imageFile);

	// 	if (uploadError) {
	// 		throw new Error(uploadError.message);
	// 	}
	// }

	return updatedUser;
};

const useUpdateUser = () => {
	return useMutation((userData: InsertUserType) => updateUserDetails(userData));
};

export { useUpdateUser };
