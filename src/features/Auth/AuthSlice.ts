import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MAIN_URL } from '../api';

export const ADMIN_API_URL = `${MAIN_URL}/admin`;

export type AdminData = {
	login: string;
	password: string;
};

export type Admin = {
	login: boolean;
	password: boolean;
};

type InitialState = {
	firstLoading: boolean;
	loading: boolean;
	admin: Admin;
	error: string;
};

const initialState: InitialState = {
	firstLoading: true,
	loading: true,
	admin: {
		login: false,
		password: false,
	},
	error: '',
};

export const auth = createAsyncThunk(
	'shop/admin',
	async (adminData: AdminData) => {
		const { data } = await axios.post(ADMIN_API_URL, adminData);
		return data;
	},
);

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		logout: (state) => {
			state.admin.login = false;
			state.admin.password = false;
			state.firstLoading = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(auth.pending, (state) => {
			state.loading = true;
			state.firstLoading = false;
		});
		builder.addCase(auth.fulfilled, (state, action: PayloadAction<Admin>) => {
			state.admin = action.payload;
			state.loading = false;
		});
		builder.addCase(auth.rejected, (state, action) => {
			state.loading = false;
			state.admin = initialState.admin;
			state.error = action.error.message || 'Admin auth goes wrong';
		});
	},
});

export default adminSlice.reducer;
export const { logout } = adminSlice.actions;
export {};
