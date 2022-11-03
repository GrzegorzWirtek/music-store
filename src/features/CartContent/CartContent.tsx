import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	removeFromCart,
	increaseNrOfProducts,
	decreaseNrOfProducts,
} from './CartContentSlice';

const CartContent = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const handleRemoveProduct = (id: string) => {
		dispatch(removeFromCart(id));
	};

	const handleIncreaseNrOfProducts = (id: string) => {
		dispatch(increaseNrOfProducts(id));
	};

	const handleDecreaseNrOfProducts = (id: string) => {
		dispatch(decreaseNrOfProducts(id));
	};

	return (
		<>
			{cart.map((product) => (
				<div key={product._id}>
					<p>
						{product.name} id: {product._id} nrOf: {product.productsInTheCart}
					</p>
					<button onClick={() => handleRemoveProduct(product._id)}>
						remove
					</button>
					<button onClick={() => handleIncreaseNrOfProducts(product._id)}>
						increase
					</button>
					<button onClick={() => handleDecreaseNrOfProducts(product._id)}>
						decrease
					</button>
				</div>
			))}
		</>
	);
};

export default CartContent;
