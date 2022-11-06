import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from '../../features/Products/ProductsSlice';
import Spinner from '../Spinner/Spinner';

const MAX_IMAGE_SIZE = 150000;

const AddProduct = () => {
	const [sizeMessage, setSizeMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMesage] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const { loading, actionCompleted } = useAppSelector(
		(state) => state.products,
	);

	useEffect(() => {
		if (actionCompleted) {
			setSuccessMesage('Added successfully');
		}
	}, [actionCompleted]);

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
		setSuccessMesage(null);
	};

	return (
		<>
			{loading && <Spinner />}
			<form
				className='add-product-form'
				onFocus={handleFocus}
				onSubmit={handleSubmit}>
				<input type='text' name='name' required placeholder='Product name' />
				<input type='number' name='price' required placeholder='Price' />
				<input
					type='number'
					name='productsInTheShop'
					required
					placeholder='Number of Products'
				/>
				{sizeMessage && sizeMessage}
				<input type='file' name='image' required />
				<button type='submit'>Submit</button>
			</form>
			{successMessage && <p>{successMessage}</p>}
		</>
	);
};
export default AddProduct;