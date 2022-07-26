import { useMutation } from 'react-query';
import { supabase } from 'supabase';
import { queryClient } from 'utils/queryClient';

export type InsertCommentType = {
	article_id: string;
	user_id: string;
	body: string;
};

const insertComment = async ({
	article_id,
	user_id,
	body,
}: InsertCommentType) => {
	const { data: insertedComment, error: insertError } = await supabase
		.from<InsertCommentType>('comments')
		.insert({
			article_id,
			user_id,
			body,
		});

	if (insertError) {
		throw new Error(insertError.message);
	}

	return insertedComment;
};

const useCreateComment = () => {
	return useMutation(
		(commentData: InsertCommentType) => insertComment(commentData),
		{
			onSuccess: () => {
				queryClient.invalidateQueries('comments');
			},
		}
	);
};

export { useCreateComment };
