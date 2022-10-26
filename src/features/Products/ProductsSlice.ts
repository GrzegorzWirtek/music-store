import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	products: [
		{
			name: 'product name 1',
			price: 20,
			nrOfProducts: 4,
			id: 'a123',
		},
		{
			name: 'product name 2',
			price: 30,
			nrOfProducts: 1,
			id: 'b123',
		},
		{
			name: 'product name 3',
			price: 55,
			nrOfProducts: 1,
			id: 'c123',
		},
	],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		takeFromStore: (state, action: PayloadAction<string>) => {
			state.products = state.products.filter(
				(product) => product.id !== action.payload,
			);
		},
		returnToStore: (state, action: PayloadAction<string>) => {
			const returnedProduct = initialState.products.find(
				(product) => product.id === action.payload,
			)!;
			console.log('ret', returnedProduct);
			state.products = [...state.products, returnedProduct];
		},
	},
});

export default productsSlice.reducer;
export const { takeFromStore, returnToStore } = productsSlice.actions;
