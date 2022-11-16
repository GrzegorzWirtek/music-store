import './Logo.scss';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
	const navigate = useNavigate();
	return (
		<img
			src='music-store-logo.png'
			alt='Music store logo'
			className='logo'
			onClick={() => navigate('/')}
		/>
	);
};
export default Logo;
