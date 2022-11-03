import { Product as ProductType } from '../../features/Products/ProductsSlice';
import { ProductInTheCart } from '../../features/CartContent/CartContentSlice';

type ProductProps = {
	product: ProductType;
	click: (product: ProductInTheCart) => void;
	buttonDescr: string;
};

const Product = ({ product, click, buttonDescr }: ProductProps) => {
	const {
		_id,
		name,
		price,
		productsInTheCart,
		productsInTheShop,
		imageBase64,
	} = product;
	return (
		<div className='product'>
			<p>
				{name} {price}zł
			</p>
			<img src={imageBase64} alt={name} />
			<button
				onClick={() =>
					click({ _id, name, price, productsInTheCart, productsInTheShop })
				}>
				{buttonDescr}
			</button>
		</div>
	);
};
export default Product;
