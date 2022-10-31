import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<Link className='navbar__link' to='/'>
				Home
			</Link>
			<Link className='navbar__link' to='/shop'>
				Shop
			</Link>
			<Link className='navbar__link' to='/contact'>
				Contact
			</Link>
			<Link className='navbar__link' to='/admin'>
				Admin
			</Link>
		</>
	);
};
export default Navbar;
