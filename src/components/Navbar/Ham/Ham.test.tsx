import { fireEvent, render, screen } from '@testing-library/react';
import Ham from './Ham';

const hamProps = {
	hamActive: false,
	toggleHam: jest.fn(),
};

const HamComponent = <Ham {...hamProps} />;

describe('Ham', () => {
	test('should call toggleHam function', async () => {
		render(HamComponent);
		const ham = screen.getByTestId('ham');
		await fireEvent.click(ham);
		expect(hamProps.toggleHam).toHaveBeenCalledTimes(1);
	});
});
