import { Link } from 'react-router-dom';

const AdminPanel = () => {
	return (
		<section className='admin-panel'>
			<Link className='admin-panel__link' to='/admin/add-product'>
				Add product
			</Link>
			<Link className='admin-panel__link' to='/admin/delete-product'>
				Delete product
			</Link>
		</section>
	);
};
export default AdminPanel;
