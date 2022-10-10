import { Link } from 'react-router-dom';
import { IoMdAddCircle } from 'react-icons/io';

const AddArticleButton = ({ visible }: { visible: boolean }) => (
	<div
		className={`fixed bottom-6 right-5 rounded-full bg-white transition-opacity duration-300 md:hidden ${
			visible ? 'opacity-100' : 'pointer-events-none  opacity-0'
		}`}
	>
		<Link to="/articles/new">
			<IoMdAddCircle
				className="text-indigo-500 transition-colors hover:text-indigo-700 "
				size="4.5rem"
			/>
		</Link>
	</div>
);

export { AddArticleButton };
