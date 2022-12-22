import './Products.scss';
import { useEffect, useCallback, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, ProductInTheCart } from '../CartContent/CartContentSlice';
import { fetchProducts } from './ProductsSlice';
import Modal from '../../components/Modal/Modal';
import Product from '../../components/Product/Product';
import Search from '../../components/Search/Search';

const Products = () => {
	console.log('products re-render');
	const dispatch = useAppDispatch();
	const { products } = useAppSelector((state) => state.products);
	const { loading } = useAppSelector((state) => state.products);
	const [modalVisible, setModalVisible] = useState<string | boolean>(false);
	const navigate = useNavigate();
	const [searchedElement, setSearchedElement] = useState('');

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearchedElement(e.target.value);
	}, []);

	const handleCleanSearch = useCallback(() => {
		setSearchedElement('');
	}, []);

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

	const searchedElements = products
		.filter((item) =>
			item.name.toLowerCase().includes(searchedElement.toLowerCase()),
		)
		.map((item) => (
			<Product
				key={item._id}
				product={item}
				click={handleAddToCart}
				buttonDescr='Add to cart'
			/>
		));

	return (
		<section className='products'>
			{!loading && (
				<Search
					searchedElement={searchedElement}
					search={handleSearch}
					cleanSearch={handleCleanSearch}
				/>
			)}
			{searchedElements}

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
export default memo(Products);
