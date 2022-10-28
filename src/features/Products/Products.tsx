import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../Cart/CartSlice';
import { Product } from './ProductsSlice';
import { fetchProducts } from './ProductsSlice';

const Products = () => {
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleAddToCart = (product: Product) => {
		dispatch(addToCart(product));
	};

	const p = products
		? products.map((item, index) => (
				<div key={index}>
					<img src={item.name} alt='aa' />
				</div>
		  ))
		: null;

	return (
		<div>
			<p style={{ borderTop: '2px solid black', padding: '20px' }}>
				this is products
			</p>
			{p}
			{products.map((product) => (
				<div key={product._id}>
					<p>
						{product.name}, id: {product._id}
					</p>
					<button onClick={() => handleAddToCart(product)}>add to cart</button>
				</div>
			))}
			<p>Loading? {loading ? 'loading...' : 'loaded'}</p>
			<p>Loading Error? {error ? error : 'no error'}</p>
		</div>
	);
};
export default Products;
