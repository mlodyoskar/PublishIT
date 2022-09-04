import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationSearch = () => {
	const [serachText, setSearchText] = useState('');
	const navigate = useNavigate();

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchText(e.currentTarget.value);
	};

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate({ pathname: '/search', search: `q=${serachText}` });
		setSearchText('');
	};

	return (
		<div className="h-full">
			<form onSubmit={handleSearchSubmit} className="h-full relative">
				<input
					className="h-full rounded-md border-none text-md"
					placeholder="Search articles"
					type="text"
					onChange={handleInputChange}
					value={serachText}
				/>
			</form>
		</div>
	);
};

export { NavigationSearch };
