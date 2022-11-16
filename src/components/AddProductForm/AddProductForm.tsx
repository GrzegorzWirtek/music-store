import './AddProductForm.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from '../../features/Products/ProductsSlice';
import Spinner from '../Spinner/Spinner';
import Modal from '../../components/Modal/Modal';

const MAX_IMAGE_SIZE = 150000;

const AddProduct = () => {
	const [sizeMessage, setSizeMessage] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { loading, actionCompleted } = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		if (actionCompleted) {
			setModalVisible(true);
		}
	}, [actionCompleted]);

	const goToShop = () => {
		navigate('/');
	};

	const addAnotherProduct = () => {
		setModalVisible(false);
	};

	const toBase64 = (file: File) =>
		new Promise((res, rej) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => res(reader.result);
			reader.onerror = (error) => rej(error);
		});

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			price: { value: string };
			productsInTheShop: { value: string };
			image: { files: File[] };
		};

		const imageFile = target.image.files[0];
		if (!imageFile) return setSizeMessage('Choose image');

		if (imageFile.size > MAX_IMAGE_SIZE) {
			return setSizeMessage('Image is too big. Maximum size is 150 KB');
		} else {
			const imageBase64 = (await toBase64(imageFile)) as string;
			const name = target.name.value;
			const price = parseInt(target.price.value);
			const productsInTheShop = parseInt(target.productsInTheShop.value);

			target.name.value = '';
			target.price.value = '';
			target.productsInTheShop.value = '';

			dispatch(
				addProduct({
					name,
					price,
					productsInTheShop,
					productsInTheCart: 1,
					imageBase64,
				}),
			);
		}
	};

	const handleFocus = () => {
		setModalVisible(false);
	};

	return (
		<>
			{loading && <Spinner />}
			{modalVisible && (
				<Modal
					clickOne={goToShop}
					clickTwo={addAnotherProduct}
					modalTitle='Product added successfully'
					clickOneText='Go to shop'
					clickTwoText='Add another'
				/>
			)}
			<form
				className='add-product-form'
				onFocus={handleFocus}
				onSubmit={handleSubmit}>
				<h2 className='add-product-form__title'>Add product</h2>

				<input
					type='text'
					name='name'
					required
					placeholder='Product name'
					className='add-product-form__input add-product-form__input--name'
				/>
				<input
					type='number'
					name='price'
					required
					placeholder='Price'
					className='add-product-form__input'
				/>
				<input
					type='number'
					name='productsInTheShop'
					required
					placeholder='Number of Products'
					className='add-product-form__input'
				/>
				{sizeMessage && (
					<p className='add-product-form__error'>{sizeMessage}</p>
				)}
				<p className='add-product-form__subtitle'>
					Image format: PNG, max image size: 150 KB
				</p>
				<label
					htmlFor='file-upload'
					className='add-product-form__input--file-label'>
					Upload image
				</label>
				<input
					id='file-upload'
					accept='image/png'
					type='file'
					name='image'
					className='add-product-form__input add-product-form__input--file'
				/>
				<button type='submit' className='add-product-form__btn'>
					Submit
				</button>
			</form>
		</>
	);
};
export default AddProduct;
