import Product from "../../types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO maybe put the CartItem interface in a separate file
interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingProduct = state.items.find(
        (item) => item.product.id === productToAdd.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.items.push({
          product: productToAdd,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const productToRemove = action.payload;
      const updatedItems = state.items.filter(
        (item) => item.product.id !== productToRemove.id
      );
      state.items = updatedItems;
    },
    emptyCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const itemToIncrease = action.payload;
      const existingItem = state.items.find(item => item.product.id === itemToIncrease.product.id);
      console.log("hello")
      if (existingItem) {
        console.log("hello")
        existingItem.quantity++;
      }
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, increaseQuantity } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
