import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/Auth/AuthSlice';

const Navbar = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const {
		admin: { login, password },
	} = useAppSelector((state) => state.admin);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/admin');
	};

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
			{login && password ? (
				<button onClick={handleLogout}>Logout</button>
			) : null}

			<Link className='navbar__link navbar__link--cart' to='/cart'>
				<img src='cart.png' alt='cart icon' className='navbar__img' />
				<p className='navbar__cart-number'>{cart.length}</p>
			</Link>
		</>
	);
};
export default Navbar;
