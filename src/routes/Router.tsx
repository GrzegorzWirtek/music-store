import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

import About from '../pages/About/About';
import Shop from '../pages/Shop/Shop';
import Admin from '../pages/Admin/Admin';
import AddProduct from '../pages/Admin/AddProduct/AddProduct';
import DeleteProduct from '../pages/Admin/DeleteProduct/DeleteProduct';
import Cart from '../pages/Cart/Cart';

const Router = () => {
	const {
		admin: { login, password },
	} = useAppSelector((state) => state.admin);

	return (
		<Routes>
			<Route path='/' element={<Shop />} />
			<Route path='/about' element={<About />} />
			<Route path='/admin' element={<Admin />} />
			<Route
				path='/admin/add-product'
				element={login && password ? <AddProduct /> : <Navigate to='/admin' />}
			/>
			<Route
				path='/admin/delete-product'
				element={
					login && password ? <DeleteProduct /> : <Navigate to='/admin' />
				}
			/>
			<Route path='/cart' element={<Cart />} />
		</Routes>
	);
};
export default Router;
