import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartContent/CartContentSlice';
import authReducer from '../features/Auth/AuthSlice';
import productsReducer from '../features/Products/ProductsSlice';
// import addProductReducer from '../features/AddProductForm/AddProductFormSlice';

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
		admin: authReducer,
		products: productsReducer,
		// addProduct: addProductReducer,
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
