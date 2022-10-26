import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { takeFromStore } from './ProductsSlice';
import { addToCart } from '../Cart/CartSlice';

export type Product = {
	name: string;
	price: number;
	nrOfProducts: number;
	id: string;
};

const Products = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);

	const handleAddToCart = (product: Product) => {
		dispatch(takeFromStore(product.id));
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
						{product.name}, price: {product.price}{' '}
						<span
							onClick={() => handleAddToCart(product)}
							style={{ border: '1px solid black', cursor: 'pointer' }}>
							To cart
						</span>
					</p>
				</div>
			))}
		</div>
	);
};
export default Products;
