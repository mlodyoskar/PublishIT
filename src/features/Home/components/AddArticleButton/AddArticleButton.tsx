import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';

const AddArticleButton = () => (
	<div className="bg-white rounded-full fixed bottom-6 right-5">
		<Link to="/articles/new">
			<IoMdAddCircle className="text-indigo-500" size="4.5rem" />
		</Link>
	</div>
);

export { AddArticleButton };
