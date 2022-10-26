import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Product = {
	id: string;
	name: string;
	price: number;
	nrOfProducts: number;
	nrInStock: number;
};

type InitialState = {
	isLoaded: boolean;
	products: Product[];
	error: string;
};

const initialState: InitialState = {
	isLoaded: false,
	products: [],
	error: '',
};

export const fetchProducts = createAsyncThunk('shop/fetchShop', async () => {
	const {
		data: { products },
	} = await axios.get('data.json');
	return products;
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.isLoaded = false;
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.products = action.payload;
			},
		);
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.isLoaded = false;
			state.products = [];
			state.error = action.error.message || 'Fetch data goes wrong';
		});
	},
});

export default productsSlice.reducer;
