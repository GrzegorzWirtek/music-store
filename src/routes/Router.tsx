import { Route, Routes } from 'react-router-dom';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/shop' element={<Shop />} />
			<Route path='/contact' element={<Contact />} />
		</Routes>
	);
};
export default Router;
