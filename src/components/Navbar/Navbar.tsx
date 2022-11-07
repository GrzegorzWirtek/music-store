import './Navbar.scss';
import { useState } from 'react';
import Ham from './Ham/Ham';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/Auth/AuthSlice';

const Navbar = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const {
		admin: { login, password },
	} = useAppSelector((state) => state.admin);

	const allProductsInTheCart = cart.reduce(
		(acc, item) => acc + item.productsInTheCart,
		0,
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate('/admin');
	};

	const [hamActive, setHamActive] = useState(false);

	const toggleHam = () => {
		setHamActive((prev) => !prev);
	};

	const closeHam = () => {
		setHamActive(false);
	};

	return (
		<>
			<Ham hamActive={hamActive} toggleHam={toggleHam} />
			<Logo />
			<nav
				onClick={closeHam}
				className={`navbar ${hamActive ? 'navbar--active' : ''}`}>
				<NavLink className='navbar__link' to='/'>
					Shop
				</NavLink>
				<NavLink className='navbar__link' to='/contact'>
					Contact
				</NavLink>
				<NavLink className='navbar__link' to='/admin'>
					Admin
				</NavLink>
				{login && password ? (
					<button onClick={handleLogout} className='navbar__link'>
						Logout
					</button>
				) : null}
			</nav>
			<NavLink className='navbar__link navbar__link--cart' to='/cart'>
				<img src='cart.png' alt='cart icon' className='navbar__img' />
				<p className='navbar__cart-number'>{allProductsInTheCart}</p>
			</NavLink>
		</>
	);
};
export default Navbar;
