import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PRUDUCTS_API_URL, NewProduct } from '../Products/ProductsSlice';

export const addProduct = createAsyncThunk(
	'shop/add',
	async (newProduct: NewProduct) => {
		const { data } = await axios.post(PRUDUCTS_API_URL, newProduct);
		return data;
	},
);

type InitialState = {
	loading: boolean;
	product: NewProduct;
	error: string;
};

const initialState: InitialState = {
	loading: true,
	product: {} as NewProduct,
	error: '',
};

const addProductsSlice = createSlice({
	name: 'addProducts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addProduct.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			addProduct.fulfilled,
			(state, action: PayloadAction<NewProduct>) => {
				state.product = action.payload;
				state.loading = false;
			},
		);
		builder.addCase(addProduct.rejected, (state, action) => {
			state.loading = false;
			state.product = {} as NewProduct;
			state.error = action.error.message || 'Add product goes wrong';
		});
	},
});

export default addProductsSlice.reducer;
