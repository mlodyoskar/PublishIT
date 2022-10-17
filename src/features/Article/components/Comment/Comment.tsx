import { Dropdown, dropdownItemsProps } from 'components/Dropdown/Dropdown';
import { ReportModal } from 'components/ReportModal/ReportModal';
import {
	InsertReportType,
	useCreateReport,
} from 'features/Article/hooks/useCreateReport';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CommentType } from 'types/CommentType';
import { UserType } from 'types/UserType';
import { formatDate } from 'utils/date';
import { getUserAvatarUrl } from 'utils/user';

interface Comment extends CommentType {
	user: UserType;
}

const Comment = ({
	commentData: {
		id,
		body,
		created_at,
		user: { id: userId, fullName, username, avatarUrl },
	},
}: {
	commentData: Comment;
}) => {
	const date = formatDate(created_at);
	const { mutate } = useCreateReport();

	const handleSubmitReport = (data: InsertReportType) => {
		mutate(data);
	};

	const [isModalVisible, setisModalVisible] = useState(false);

	const handlesModalVisibility = (isVisible: boolean) => {
		setisModalVisible(isVisible);
	};
	const dropdownItems: dropdownItemsProps[] = [
		{
			text: 'Report',
			handleClick: () => handlesModalVisibility(true),
		},
	];
	return (
		<div
			key={id}
			className="relative my-2 flex gap-2 border-b-2 border-gray-100 p-2 last:border-none"
		>
			<Link to={`/users/${userId}`} className="w-1/12">
				<img
					className="m-auto h-12 w-12 rounded-xl object-cover transition-transform hover:scale-105"
					src={`${getUserAvatarUrl(avatarUrl)}`}
					alt={`${fullName}s avatar`}
				/>
			</Link>
			<div className="relative w-10/12">
				<p className="mb-2 text-sm text-gray-800">
					<Link
						className="hover:text-indigo-500 hover:underline"
						to={`/users/${userId}`}
					>
						{fullName || username}
					</Link>{' '}
					| <span>{date}</span>
				</p>

				<p className="mb-2 text-justify">{body}</p>
			</div>
			<Dropdown dropdownSide="left" dropdownItems={dropdownItems}>
				<BsThreeDots
					className="absolute right-4 top-2 text-indigo-300 hover:text-indigo-800"
					size="1.2rem"
				/>
			</Dropdown>
			<ReportModal
				isOpen={isModalVisible}
				handler={() => handlesModalVisibility(false)}
				submitHandler={handleSubmitReport}
				reportType="comment"
				commentId={id}
			/>
		</div>
	);
};

export { Comment };
