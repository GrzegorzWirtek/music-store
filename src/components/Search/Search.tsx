import { memo, useRef } from 'react';
import './Search.scss';

type SearchProps = {
	searchedElement: string;
	search: (e: React.ChangeEvent<HTMLInputElement>) => void;
	cleanSearch: () => void;
};

const Search = ({ searchedElement, search, cleanSearch }: SearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null!);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		inputRef.current.blur();
	};

	return (
		<form className='search' onSubmit={handleSubmit}>
			<input
				className='search__input'
				type='text'
				onChange={(e) => search(e)}
				value={searchedElement}
				placeholder='Search'
				ref={inputRef}
			/>
			<button className='search__btn' type='button' onClick={cleanSearch}>
				<img className='search__svg' src='close.svg' alt='close' />
			</button>
		</form>
	);
};

export default memo(Search);
