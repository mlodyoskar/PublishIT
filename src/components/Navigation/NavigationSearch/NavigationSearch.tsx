import { useSearch } from 'hooks/api/useSearch';
import { useDebounce } from 'hooks/useDebounce';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { useOnClickOutside } from 'hooks/useClickOutside';

const NavigationSearch = () => {
	const [serachText, setSearchText] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchText(e.currentTarget.value);
	};

	const closePopup = () => {
		setIsOpen(false);
	};

	const inputRef = useRef<HTMLInputElement>(null);
	useOnClickOutside(inputRef, closePopup);

	const debounceSearchValue = useDebounce(serachText, 500);

	const { data: searchedArticles } = useSearch(debounceSearchValue);

	return (
		<div className="h-full">
			<div className="h-full relative">
				<input
					className="h-full rounded-md border-none text-md"
					placeholder="Szukaj"
					type="text"
					onChange={handleInputChange}
					ref={inputRef}
				/>
			</div>
			<div
				className={cls('bg-gray-50 flex flex-col rounded-md absolute top-18', {})}
			>
				{searchedArticles?.map(({ id, title }) => (
					<Link
						to={`/articles/${id}`}
						className={cls(
							'flex gap-2 items-center h-16 w-60 hover:rounded-md hover:bg-indigo-100 border-indigo-600 px-2 overflow-hidden'
						)}
						key={id}
					>
						<p>{title}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export { NavigationSearch };
