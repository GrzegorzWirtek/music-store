import './Product.scss';
import { useNavigate } from 'react-router-dom';
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

	const navigate = useNavigate();

	const handleGoToProduct = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		_id: string,
	) => {
		if (e.target instanceof HTMLButtonElement)
			return click({ _id, name, price, productsInTheCart, productsInTheShop });
		navigate(`product/${_id}`);
	};

	return (
		<div className='product' onClick={(e) => handleGoToProduct(e, _id)}>
			<div className='product__img-wrapper'>
				<img src={imageBase64} alt={name} className='product__img' />
			</div>
			<h2 className='product__name'>{name}</h2>
			<p className='product__price'>{price}$</p>
			<p className='product__in-the-shop'>
				Number of products available: {productsInTheShop}
			</p>
			<button
				// onClick={() =>
				// 	click({ _id, name, price, productsInTheCart, productsInTheShop })
				// }
				className='product__btn'>
				{buttonDescr}
			</button>
		</div>
	);
};
export default Product;
