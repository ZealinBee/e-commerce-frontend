import Product from "../../types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productToRemove = action.payload;
      const updatedItems = state.items.filter(
        (item) => item.product.id !== productToRemove
      );
      state.items = updatedItems;
    },
    emptyCart: (state) => {
      state.items = [];
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const itemToIncrease = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === itemToIncrease.product.id
      );
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const itemToDecrease = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === itemToDecrease.product.id
      );
      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
          const updatedItems = state.items.filter(
            (item) => item.product.id !== itemToDecrease.product.id
          );
          state.items = updatedItems;
        }
      }
    },
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }
    
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseQuantity,
  decreaseQuantity,
  updateCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
