import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
	name: string;
	price: number;
	nrOfProducts: number;
	id: number;
};

const initialCartState = {
	card: [] as Product[],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		add: (state, action: PayloadAction<Product>) => {
			state.card = [...state.card, action.payload];
		},
		remove: (state, action: PayloadAction<number>) => {
			state.card = state.card.filter((item) => item.id !== action.payload);
		},
	},
});

export default cartSlice.reducer;
export const { add, remove } = cartSlice.actions;
