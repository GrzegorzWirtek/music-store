import './sass/index.scss';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistStore } from 'redux-persist';

import { Provider } from 'react-redux';
import store from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
let persistor = persistStore(store);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
);
