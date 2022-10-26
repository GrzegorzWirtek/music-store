import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../Cart/CartSlice';
import { Product } from './ProductsSlice';
import { fetchProducts } from './ProductsSlice';

const Products = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleAddToCart = (product: Product) => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<p style={{ borderTop: '2px solid black', padding: '20px' }}>
				this is product
			</p>
			{products.map((product) => (
				<div key={product.id}>
					<p>
						{product.name}, id: {product.id}
					</p>
					<button onClick={() => handleAddToCart(product)}>add to cart</button>
				</div>
			))}
		</div>
	);
};
export default Products;
