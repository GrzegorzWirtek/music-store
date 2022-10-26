import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { add, remove } from './CartSlice';

const Cart = () => {
	const { card } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const handleAddProduct = () => {
		dispatch(
			add({
				name: 'product name',
				price: 20,
				nrOfProducts: 1,
				id: Math.random() * 10,
			}),
		);
	};

	const handleRemoveProduct = (id: number) => {
		dispatch(remove(id));
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
			<button onClick={handleAddProduct}>Dodaj produkt</button>
		</>
	);
};

export default Cart;
