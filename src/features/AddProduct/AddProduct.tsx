import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addProduct } from './AddProductSlice';

const MAX_IMAGE_SIZE = 150000;

const AddProduct = () => {
	const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
	const dispatch = useAppDispatch();

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
			return setDownloadMessage('Image is too big. Maximum size is 150 KB');
		} else {
			const imageBase64 = (await toBase64(imageFile)) as string;
			const name = target.name.value;
			const price = parseInt(target.price.value);
			const productsInTheShop = parseInt(target.productsInTheShop.value);

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

	return (
		<form className='add-product-form' onSubmit={handleSubmit}>
			<input type='text' name='name' required placeholder='Product name' />
			<input type='number' name='price' required placeholder='Price' />
			<input
				type='number'
				name='productsInTheShop'
				required
				placeholder='Number of Products'
			/>
			{downloadMessage && downloadMessage}
			<input type='file' name='image' required />
			<button type='submit'>Submit</button>
		</form>
	);
};
export default AddProduct;
