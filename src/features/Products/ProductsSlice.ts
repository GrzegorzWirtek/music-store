import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const PRUDUCTS_API_URL = 'http://localhost:3001/products';

export type Product = {
	_id: string;
	name: string;
	price: number;
	productsInTheCart: number;
	productsInTheShop: number;
	imageBase64: string;
};

type InitialState = {
	loading: boolean;
	products: Product[];
	error: string;
};

const initialState: InitialState = {
	loading: true,
	products: [],
	error: '',
};

export const fetchProducts = createAsyncThunk('shop/fetchShop', async () => {
	const { data } = await axios.get(PRUDUCTS_API_URL);
	return data;
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchProducts.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.products = action.payload;
				state.loading = false;
			},
		);
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Fetch data goes wrong';
		});
	},
});

export default productsSlice.reducer;
