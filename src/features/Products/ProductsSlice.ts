import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const PRUDUCTS_API_URL = 'http://localhost:3001/products';

export type NewProduct = {
	name: string;
	price: number;
	productsInTheCart: number;
	productsInTheShop: number;
	imageBase64: string;
};

export type Product = NewProduct & {
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

export const fetchProducts = createAsyncThunk('shop/fetch', async () => {
	const { data } = await axios.get(PRUDUCTS_API_URL);
	return data;
});

export const addProduct = createAsyncThunk(
	'shop/add',
	async (newProduct: NewProduct) => {
		const { data } = await axios.post(PRUDUCTS_API_URL, newProduct);
		return data;
	},
);

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
		builder.addCase(addProduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			addProduct.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.products = action.payload;
				state.loading = false;
			},
		);
		builder.addCase(addProduct.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Add product goes wrong';
		});
	},
});

export default productsSlice.reducer;
