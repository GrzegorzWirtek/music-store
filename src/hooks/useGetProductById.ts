import { useAppSelector } from '../app/hooks';

export const useGetProductById = (id: string) => {
	const { products } = useAppSelector((state) => state.products);

	const product = products.find((item) => item._id === id);

	return product;
};
