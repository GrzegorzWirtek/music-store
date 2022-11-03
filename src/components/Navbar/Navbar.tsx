import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const Navbar = () => {
	const { cart } = useAppSelector((state) => state.cart);

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
			<Link className='navbar__link navbar__link--cart' to='/cart'>
				<img src='cart.png' alt='cart icon' className='navbar__img' />
				<p className='navbar__cart-number'>{cart.length}</p>
			</Link>
		</>
	);
};
export default Navbar;
