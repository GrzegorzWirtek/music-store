import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Product from '../../components/Product/Product';
import { addToCart, ProductInTheCart } from '../CartContent/CartContentSlice';
import { fetchProducts } from './ProductsSlice';

const Products = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const handleAddToCart = (product: ProductInTheCart) => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<p style={{ borderTop: '2px solid black', padding: '20px' }}>
				this is products
			</p>
			{products.map((item) => (
				<Product
					key={item._id}
					product={item}
					click={handleAddToCart}
					buttonDescr='Add to cart'
				/>
			))}
		</div>
	);
};
export default Products;
