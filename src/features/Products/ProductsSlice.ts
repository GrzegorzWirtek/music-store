import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MAIN_URL } from '../api';

export const PRUDUCTS_API_URL = `${MAIN_URL}/products`;

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
	description: string;
	price: number;
	productsInTheCart: number;
	productsInTheShop: number;
	imageBase64: string;
};

export type ProductId = {
	_id: string;
};

type InitialState = {
	loading: boolean;
	actionCompleted: boolean;
	products: Product[];
	error: string;
};

const initialState: InitialState = {
	loading: false,
	actionCompleted: false,
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

export const deleteProduct = createAsyncThunk(
	'shop/delete',
	async (productId: ProductId) => {
		const { data } = await axios.delete(PRUDUCTS_API_URL, { data: productId });
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
			state.actionCompleted = false;
		});
		builder.addCase(
			addProduct.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.products = action.payload;
				state.loading = false;
				state.actionCompleted = true;
			},
		);
		builder.addCase(addProduct.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Add product goes wrong';
		});
		builder.addCase(deleteProduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			deleteProduct.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.products = action.payload;
				state.loading = false;
			},
		);
		builder.addCase(deleteProduct.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Delete product goes wrong';
		});
	},
});

export default productsSlice.reducer;
