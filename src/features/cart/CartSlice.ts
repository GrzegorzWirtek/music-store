import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Products/ProductsSlice';

const initialCartState = {
	cart: [] as Product[],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			const id = action.payload.id;
			const index = state.cart.findIndex((item) => item.id === id);
			if (index < 0) {
				state.cart = [...state.cart, action.payload];
			} else if (state.cart[index].nrOfProducts < state.cart[index].nrInStock) {
				state.cart[index].nrOfProducts++;
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload);
		},
		increaseNrOfProducts: (state, action: PayloadAction<string>) => {
			state.cart.forEach((item) => {
				if (item.id === action.payload && item.nrOfProducts < item.nrInStock) {
					item.nrOfProducts++;
				}
			});
		},
		decreaseNrOfProducts: (state, action: PayloadAction<string>) => {
			state.cart.forEach((item) => {
				if (item.id === action.payload && item.nrOfProducts > 1) {
					item.nrOfProducts--;
				}
			});
		},
	},
});

export default cartSlice.reducer;
export const {
	addToCart,
	removeFromCart,
	increaseNrOfProducts,
	decreaseNrOfProducts,
} = cartSlice.actions;
