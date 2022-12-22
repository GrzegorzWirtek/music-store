import { memo } from 'react';
import './Search.scss';

type SearchProps = {
	searchedElement: string;
	search: (e: React.ChangeEvent<HTMLInputElement>) => void;
	cleanSearch: () => void;
};

const Search = ({ searchedElement, search, cleanSearch }: SearchProps) => {
	return (
		<div className='search'>
			<input
				className='search__input'
				type='text'
				onChange={(e) => search(e)}
				value={searchedElement}
				placeholder='Search'
			/>
			<button className='search__btn' type='button' onClick={cleanSearch}>
				<img className='search__svg' src='close.svg' alt='close' />
			</button>
		</div>
	);
};

export default memo(Search);
