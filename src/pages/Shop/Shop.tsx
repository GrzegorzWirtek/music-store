import './Shop.scss';
import Spinner from '../../components/Spinner/Spinner';
import Products from '../../features/Products/Products';
import { useAppSelector } from '../../app/hooks';

const Shop = () => {
	const { loading } = useAppSelector((state) => state.products);
	const spinner = loading && <Spinner />;

	return (
		<main className='shop'>
			<Products />
			{spinner}
		</main>
	);
};
export default Shop;
