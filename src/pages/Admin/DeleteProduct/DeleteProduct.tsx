import './DeleteProduct.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Modal from '../../../components/Modal/Modal';
import Product from '../../../components/Product/Product';
import Spinner from '../../../components/Spinner/Spinner';
import { ProductInTheCart } from '../../../features/CartContent/CartContentSlice';
import {
	deleteProduct,
	fetchProducts,
} from '../../../features/Products/ProductsSlice';

const DeleteProduct = () => {
	const dispatch = useAppDispatch();
	const { products, loading } = useAppSelector((state) => state.products);
	const [modalVisible, setModalVisible] = useState(false);
	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchProducts());
		}
	}, [dispatch, products.length]);

	const handleDelete = ({ _id }: ProductInTheCart) => {
		setModalVisible(true);
		setId(_id);
	};

	const handleModalYes = () => {
		if (!id) return;
		dispatch(deleteProduct({ _id: id }));
		setModalVisible(false);
		setId(null);
	};

	const handleModalNo = () => {
		setModalVisible(false);
		setId(null);
	};

	return (
		<>
			{loading && <Spinner />}
			{modalVisible && (
				<Modal
					modalTitle='Are you sure you want to remove this product?'
					clickOne={handleModalYes}
					clickTwo={handleModalNo}
					clickOneText='Yes'
					clickTwoText='No'
				/>
			)}
			<section className='delete-product'>
				<h2 className='delete-product__title'>Delete products</h2>
				{products.map((item) => (
					<Product
						key={item._id}
						product={item}
						click={handleDelete}
						buttonDescr='Delete Product'
					/>
				))}
			</section>
		</>
	);
};
export default DeleteProduct;
