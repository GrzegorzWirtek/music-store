import './App.scss';
import { HashRouter } from 'react-router-dom';
import Router from './routes/Router';
import Navbar from './components/Navbar/Navbar';
import Cart from './features/cart/Cart';

function App() {
	return (
		<div className='App'>
			<HashRouter>
				<Navbar />
				<Cart />
				<Router />
			</HashRouter>
		</div>
	);
}

export default App;
