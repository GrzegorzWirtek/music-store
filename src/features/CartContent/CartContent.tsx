import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	removeFromCart,
	increaseNrOfProducts,
	decreaseNrOfProducts,
} from './CartContentSlice';
import { fetchProducts } from '../Products/ProductsSlice';

type CartContentType = {
	_id: string;
	name: string;
	productsInTheCart: number;
	price: number;
	imageBase64: string;
}[];

const CartContent = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const { products } = useAppSelector((state) => state.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const productsInTheCart = () => {
		const arr = [] as CartContentType;
		for (const a of products) {
			for (const b of cart) {
				if (a._id === b._id) {
					const product = {
						_id: a._id,
						name: a.name,
						productsInTheCart: b.productsInTheCart,
						price: a.price * b.productsInTheCart,
						imageBase64: a.imageBase64,
					};
					arr.push(product);
				}
			}
		}
		return arr;
	};

	const productContent = productsInTheCart().map((product) => (
		<div key={product._id}>
			<img src={product.imageBase64} alt={product.name} />
			<p>sum: {product.price}</p>
			<p>
				{product.name} id: {product._id} nrOf: {product.productsInTheCart}
			</p>
			<button onClick={() => handleRemoveProduct(product._id)}>remove</button>
			<button onClick={() => handleIncreaseNrOfProducts(product._id)}>
				increase
			</button>
			<button onClick={() => handleDecreaseNrOfProducts(product._id)}>
				decrease
			</button>
		</div>
	));

	const handleRemoveProduct = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const handleIncreaseNrOfProducts = (id: string) => {
		dispatch(increaseNrOfProducts(id));
	};

	const handleDecreaseNrOfProducts = (id: string) => {
		dispatch(decreaseNrOfProducts(id));
	};

	return <>{productContent}</>;
};

export default CartContent;
