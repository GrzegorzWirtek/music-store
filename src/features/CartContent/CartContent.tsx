import './CartContent.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	removeFromCart,
	increaseNrOfProducts,
	decreaseNrOfProducts,
} from './CartContentSlice';
import { fetchProducts } from '../Products/ProductsSlice';
import CartItem from '../../components/CartItem/CartItem';

export type CartContentType = {
	_id: string;
	name: string;
	productsInTheCart: number;
	price: number;
	imageBase64: string;
};

const CartContent = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const { products } = useAppSelector((state) => state.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const handleIncreaseNrOfProducts = (id: string) => {
		dispatch(increaseNrOfProducts(id));
	};

	const handleDecreaseNrOfProducts = (id: string) => {
		dispatch(decreaseNrOfProducts(id));
	};

	const handleRemoveProduct = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const productsInTheCart = () => {
		const arr = [] as CartContentType[];
		for (const a of products) {
			for (const b of cart) {
				if (a._id === b._id) {
					const product = {
						_id: a._id,
						name: a.name,
						productsInTheCart: b.productsInTheCart,
						price: a.price,
						imageBase64: a.imageBase64,
					};
					arr.push(product);
				}
			}
		}
		return arr;
	};

	const productContent = productsInTheCart().map((product) => (
		<CartItem
			key={product._id}
			product={product}
			increase={handleIncreaseNrOfProducts}
			decrease={handleDecreaseNrOfProducts}
			remove={handleRemoveProduct}
		/>
	));

	const emptyMessage = (
		<div className='cart-content__empty'>
			<p className='cart-content__empty-message'>Shopping cart is empty</p>
			<Link className='cart-content__go-to-shop' to='/'>
				Go to shop
			</Link>
		</div>
	);

	return (
		<section className='cart-content'>
			<h2 className='cart-content__title'>Shopping cart</h2>
			{cart.length ? productContent : emptyMessage}
		</section>
	);
};

export default CartContent;
