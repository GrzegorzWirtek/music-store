import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { addToCart } from '../../features/CartContent/CartContentSlice';
import { useGetProductById } from '../../hooks/useGetProductById';
import Modal from '../../components/Modal/Modal';

const ProductInfo = () => {
	const [modalVisible, setModalVisible] = useState<string | boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const product = useGetProductById(id!);
	if (!product) return <Navigate to='/' />;

	const { name, imageBase64, price, productsInTheCart } = product;

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
			<h3 className='product-info__name'>{name}</h3>
			<p className='product-info__price'>{price}</p>
			<p className='product-info__products-in-the-cart'>{productsInTheCart}</p>
			<p className='product-info__products-in-the-shop'>
				{product?.productsInTheShop}
			</p>
			<button onClick={() => handleAddToCart()} className='product__btn'>
				ADD TO CART
			</button>
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
