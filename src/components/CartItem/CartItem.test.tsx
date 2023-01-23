import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CartItem from './CartItem';
import { CartContentType } from '../../features/CartContent/CartContent';

const CartItemProps = {
	product: {} as CartContentType,
	increase: jest.fn(),
	decrease: jest.fn(),
	remove: jest.fn(),
};

const CartItemComponent = <CartItem {...CartItemProps} />;

describe('CartItem', () => {
	test('should call increase, decrease and remove functions', async () => {
		render(CartItemComponent);

		const increaseBtn = screen.getByRole('button', {
			name: /\+/i,
		});
		const decreaseBtn = screen.getByRole('button', {
			name: /-/i,
		});
		const removeBtn = screen.getByRole('button', {
			name: /remove/i,
		});

		await user.click(increaseBtn);
		expect(CartItemProps.increase).toHaveBeenCalledTimes(1);

		await user.click(decreaseBtn);
		expect(CartItemProps.decrease).toHaveBeenCalledTimes(1);

		await user.click(removeBtn);
		expect(CartItemProps.remove).toHaveBeenCalledTimes(1);
	});
});
