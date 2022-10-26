import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../Products/Products';

const initialCartState = {
	cart: [] as Product[],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
			state.cart = [...state.cart, action.payload];
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload);
		},
	},
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
