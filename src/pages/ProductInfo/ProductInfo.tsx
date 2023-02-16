import './ProductInfo.scss';
import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/CartContent/CartContentSlice';
import { useGetProductById } from '../../hooks/useGetProductById';
import Modal from '../../components/Modal/Modal';

const ProductInfo = () => {
	window.scrollTo(0, 0);
	const [modalVisible, setModalVisible] = useState<string | boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const product = useGetProductById(id!);
	if (!product) return <Navigate to='/' />;

	const { name, description, imageBase64, price, productsInTheShop } = product;

	const handleAddToCart = () => {
		dispatch(addToCart(product));
		setModalVisible(name);
	};

	const handleGoToCart = () => {
		setModalVisible(false);
		navigate('../../cart');
	};

	const handleContinueShopping = () => {
		setModalVisible(false);
	};

	return (
		<section className='product-info'>
			<img className='product-info__img' src={imageBase64} alt={name} />
			<div className='product-info__text-content'>
				<h3 className='product-info__name'>{name}</h3>
				<p className='product-info__price'>{price}$</p>
				<p className='product-info__description'>{description}</p>
				<p className='product-info__in-the-shop'>
					Number of products available: {productsInTheShop}
				</p>
				<button onClick={() => handleAddToCart()} className='product-info__btn'>
					ADD TO CART
				</button>
			</div>
			{modalVisible && (
				<Modal
					clickOne={handleGoToCart}
					clickTwo={handleContinueShopping}
					modalTitle={`"${modalVisible}" added to shopping cart`}
					clickOneText='Go to shopping cart'
					clickTwoText='Back to shopping'
				/>
			)}
		</section>
	);
};
export default ProductInfo;
