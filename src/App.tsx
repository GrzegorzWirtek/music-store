import './App.scss';
import { HashRouter } from 'react-router-dom';
import Router from './routes/Router';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<div className='App'>
			<HashRouter>
				<Navbar />
				<Router />
			</HashRouter>
		</div>
	);
}

export default App;
