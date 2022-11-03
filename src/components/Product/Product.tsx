import { Product as ProductType } from '../../features/Products/ProductsSlice';
import { ProductInTheCart } from '../../features/CartContent/CartContentSlice';

type ProductProps = {
	product: ProductType;
	click: (product: ProductInTheCart) => void;
};

const Product = ({ product, click }: ProductProps) => {
	const { _id, name, price, productsInTheCart, productsInTheShop } = product;
	return (
		<div className='product'>
			<p>this is product {_id}</p>
			<button
				onClick={() =>
					click({ _id, name, price, productsInTheCart, productsInTheShop })
				}>
				Do koszyka
			</button>
		</div>
	);
};
export default Product;
