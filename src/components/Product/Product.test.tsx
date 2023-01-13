import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Product from './Product';

const clickhHandler = jest.fn();

const ProductType = {
	_id: 'product id',
	name: 'product name',
	price: 555,
	productsInTheCart: 10,
	productsInTheShop: 10,
	imageBase64: 'image base64 string',
};

const ProductProps = {
	product: ProductType,
	click: clickhHandler,
	buttonDescr: 'button description',
};

const productComponent = <Product {...ProductProps} />;

describe('Product', () => {
	test('click handler are called', async () => {
		render(productComponent);
		const addToCardButton = screen.getByRole('button');
		await user.click(addToCardButton);
		expect(clickhHandler).toHaveBeenCalledTimes(1);
	});
});
