import './Admin.scss';
import Auth from '../../features/Auth/Auth';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../../components/Spinner/Spinner';
import AdminPanel from '../../components/AdminPanel/AdminPanel';

const Admin = () => {
	const {
		loading,
		admin: { login, password },
		firstLoading,
	} = useAppSelector((state) => state.admin);

	const content = login && password ? <AdminPanel /> : <Auth />;
	const spinner = loading && !firstLoading ? <Spinner /> : null;

	return (
		<section className='admin'>
			{spinner}
			{content}
		</section>
	);
};
export default Admin;
