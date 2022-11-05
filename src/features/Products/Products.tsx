import './Products.scss';
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
		<section className='products'>
			{products.map((item) => (
				<Product
					key={item._id}
					product={item}
					click={handleAddToCart}
					buttonDescr='Add to cart'
				/>
			))}
		</section>
	);
};
export default Products;
