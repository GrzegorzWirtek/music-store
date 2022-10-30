import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, ProductInTheCart } from '../Cart/CartSlice';
import { fetchProducts } from './ProductsSlice';

const Products = () => {
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleAddToCart = (product: ProductInTheCart) => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<p style={{ borderTop: '2px solid black', padding: '20px' }}>
				this is products
			</p>
			{products.map(
				({
					_id,
					name,
					price,
					productsInTheCart,
					productsInTheShop,
					imageBase64,
				}) => (
					<div key={_id}>
						<p>
							{name}, price: {price}
						</p>
						<img src={imageBase64} alt='aa' />
						<button
							onClick={() =>
								handleAddToCart({
									_id,
									name,
									price,
									productsInTheCart,
									productsInTheShop,
								})
							}>
							add to cart
						</button>
					</div>
				),
			)}
			<p>Loading? {loading ? 'loading...' : 'loaded'}</p>
			<p>Loading Error? {error ? error : 'no error'}</p>
		</div>
	);
};
export default Products;
