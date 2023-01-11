import { fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Search from './Search';

const testText = 'test text';
const searchHandler = jest.fn();
const cleanSearchHandler = jest.fn();

describe('Search', () => {
	test('should render value in input', () => {
		render(
			<Search
				searchedElement={testText}
				search={searchHandler}
				cleanSearch={cleanSearchHandler}
			/>,
		);

		const input: HTMLInputElement = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: testText } });
		expect(input.value).toBe(testText);
	});

	test('clear handler are called', async () => {
		render(
			<Search
				searchedElement={testText}
				search={searchHandler}
				cleanSearch={cleanSearchHandler}
			/>,
		);

		const cleanSearchButton = screen.getByRole('button');
		await user.click(cleanSearchButton);
		expect(cleanSearchHandler).toHaveBeenCalledTimes(1);
	});
});
