import AddProductForm from '../../features/AddProduct/AddProduct';
import Auth from '../../features/Auth/Auth';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';

const Admin = () => {
	const {
		loading,
		admin: { login, password },
		firstLoading,
	} = useAppSelector((state) => state.admin);

	const content = login && password ? <AddProductForm /> : <Auth />;
	const spinner = loading && !firstLoading ? <Spinner /> : null;

	return (
		<>
			{spinner}
			<h2>Admin</h2>
			{content}
		</>
	);
};
export default Admin;
