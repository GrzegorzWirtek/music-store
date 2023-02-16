import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProductInTheCart = {
	_id: string;
	name: string;
	price: number;
	productsInTheCart: number;
	productsInTheShop: number;
};

const initialCartState = {
	cart: [] as ProductInTheCart[],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addToCart: (state, action: PayloadAction<ProductInTheCart>) => {
			console.log('działa console');
			const id = action.payload._id;
			const index = state.cart.findIndex((item) => item._id === id);
			if (index < 0) {
				state.cart = [...state.cart, action.payload];
			} else if (
				state.cart[index].productsInTheCart <
				state.cart[index].productsInTheShop
			) {
				state.cart[index].productsInTheCart++;
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item._id !== action.payload);
		},
		increaseNrOfProducts: (state, action: PayloadAction<string>) => {
			state.cart.forEach((item) => {
				if (
					item._id === action.payload &&
					item.productsInTheCart < item.productsInTheShop
				) {
					item.productsInTheCart++;
				}
			});
		},
		decreaseNrOfProducts: (state, action: PayloadAction<string>) => {
			state.cart.forEach((item) => {
				if (item._id === action.payload && item.productsInTheCart > 1) {
					item.productsInTheCart--;
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
