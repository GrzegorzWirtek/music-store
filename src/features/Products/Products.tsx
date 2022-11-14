import './Products.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Product from '../../components/Product/Product';
import { addToCart, ProductInTheCart } from '../CartContent/CartContentSlice';
import { fetchProducts } from './ProductsSlice';
import Modal from '../../components/Modal/Modal';

const Products = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	const [modalVisible, setModalVisible] = useState<string | boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const handleAddToCart = (product: ProductInTheCart) => {
		dispatch(addToCart(product));
		setModalVisible(product.name);
	};

	const handleGoToCart = () => {
		setModalVisible(false);
		navigate('cart');
	};

	const handleContinueShopping = () => {
		setModalVisible(false);
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
export default Products;
