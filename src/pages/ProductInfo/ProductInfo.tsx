import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
// import Modal from '../../components/Modal/Modal';

const ProductInfo = () => {
	const { products } = useAppSelector((state) => state.products);
	const { id } = useParams();
	const p = products.filter((item) => item._id === id);
	console.log(p);
	const {
		_id,
		imageBase64,
		name,
		price,
		productsInTheCart,
		productsInTheShop,
	} = p[0];

	return (
		<section className='product-info'>
			<img className='product-info__img' src={imageBase64} alt={name} />
			<h3 className='product-info__name'>{name}</h3>
			<p className='product-info__price'>{price}</p>
			<p className='product-info__products-in-the-cart'>{productsInTheCart}</p>
			<p className='product-info__products-in-the-shop'>{productsInTheShop}</p>
			<button
				onClick={() =>
					console.log({
						_id,
						name,
						price,
						productsInTheCart,
						productsInTheShop,
					})
				}
				className='product__btn'>
				ADD TO CART
			</button>
		</section>
	);
};
export default ProductInfo;
