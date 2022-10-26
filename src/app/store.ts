import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/Cart/CartSlice';
import productsReducer from '../features/Products/ProductsSlice';

import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: persistedReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
