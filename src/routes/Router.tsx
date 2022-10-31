import { Route, Routes } from 'react-router-dom';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import Admin from '../pages/Admin/Admin';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/shop' element={<Shop />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/admin' element={<Admin />} />
		</Routes>
	);
};
export default Router;
