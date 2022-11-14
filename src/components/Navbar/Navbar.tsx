import './Navbar.scss';
import { useState } from 'react';
import Ham from './Ham/Ham';
import Logo from '../Logo/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/Auth/AuthSlice';
import Modal from '../../components/Modal/Modal';

const Navbar = () => {
	const { cart } = useAppSelector((state) => state.cart);
	const {
		admin: { login, password },
	} = useAppSelector((state) => state.admin);

	const [hamActive, setHamActive] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const allProductsInTheCart = cart.reduce(
		(acc, item) => acc + item.productsInTheCart,
		0,
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		setModalVisible(true);
	};

	const logoutAdmin = () => {
		setModalVisible(false);
		dispatch(logout());
		navigate('/admin');
	};

	const cancelLogoutAdmin = () => {
		setModalVisible(false);
	};

	const toggleHam = () => {
		setHamActive((prev) => !prev);
	};

	const closeHam = () => {
		setHamActive(false);
	};

	return (
		<>
			{modalVisible && (
				<Modal
					clickOne={logoutAdmin}
					clickTwo={cancelLogoutAdmin}
					modalTitle='Are you sure you want to log out?'
					clickOneText='Yes'
					clickTwoText='No'
				/>
			)}
			<section className='navbar-wrapper'>
				<Ham hamActive={hamActive} toggleHam={toggleHam} />
				<Logo />
				<nav
					onClick={closeHam}
					className={`navbar ${hamActive ? 'navbar--active' : ''}`}>
					<NavLink className='navbar__link' to='/'>
						Shop
					</NavLink>
					<NavLink className='navbar__link' to='/about'>
						About
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
			</section>
		</>
	);
};
export default Navbar;
