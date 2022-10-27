import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	removeFromCart,
	increaseNrOfProducts,
	decreaseNrOfProducts,
} from './CartSlice';

const Cart = () => {
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
				<div key={product.id}>
					<p>
						{product.name} id: {product.id} nrOf: {product.nrOfProducts}
					</p>
					<button onClick={() => handleRemoveProduct(product.id)}>
						remove
					</button>
					<button onClick={() => handleIncreaseNrOfProducts(product.id)}>
						increase
					</button>
					<button onClick={() => handleDecreaseNrOfProducts(product.id)}>
						decrease
					</button>
				</div>
			))}
		</>
	);
};

export default Cart;
