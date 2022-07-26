import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';

const AddArticleButton = ({ visible }: { visible: boolean }) => (
	<div
		className={`bg-white rounded-full fixed bottom-6 right-5 md:hidden transition-opacity duration-300 ${
			visible ? 'opacity-100' : 'opacity-0  pointer-events-none'
		}`}
	>
		<Link to="/articles/new">
			<IoMdAddCircle
				className="hover:text-indigo-700 text-indigo-500 transition-colors "
				size="4.5rem"
			/>
		</Link>
	</div>
);

export { AddArticleButton };
