import './App.scss';
import { HashRouter } from 'react-router-dom';
import Router from './routes/Router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className='App'>
			<HashRouter>
				<Navbar />
				<Router />
				<Footer />
			</HashRouter>
		</div>
	);
}

export default App;
