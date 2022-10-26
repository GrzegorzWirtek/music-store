import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart } from './CartSlice';
import { returnToStore } from '../Products/ProductsSlice';

const Cart = () => {
	const { cart: card } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const handleRemoveProduct = (id: string) => {
		dispatch(removeFromCart(id));
		dispatch(returnToStore(id));
	};

	return (
		<>
			{card.map((product) => (
				<div key={product.id}>
					<p>
						{product.name} id: {product.id}
					</p>
					<span onClick={() => handleRemoveProduct(product.id)}>remove</span>
				</div>
			))}
		</>
	);
};

export default Cart;
