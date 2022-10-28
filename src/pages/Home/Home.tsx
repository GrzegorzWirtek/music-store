import { useState } from 'react';

const MAX_IMAGE_SIZE = 200000;

const Home = () => {
	const [imageUrl, setImageUrl] = useState('');

	const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (file.size > MAX_IMAGE_SIZE) return console.log('zdjęcie jest za duże');
		getBase64(file);
	};

	const onLoad = (fileString: string) => {
		setImageUrl(fileString);
	};

	const getBase64 = (file: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			if (typeof reader.result !== 'string') return;
			onLoad(reader.result);
		};
	};

	return (
		<>
			<p>Home</p>
			<input
				type='file'
				accept='image/png'
				onChange={(e) => handleUploadFile(e)}
			/>
			<img src={imageUrl} alt='download img' />
		</>
	);
};
export default Home;
