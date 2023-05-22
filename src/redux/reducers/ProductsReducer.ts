import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../types/Product";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: null | string;
  searchResults: Product[];
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchResults: [],
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>(
        "https://api.escuelajs.co/api/v1/products"
      );
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query: string) => {
    try {
      const result = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products`
      );
      const products = result.data
      const searchResults = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
      return searchResults;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            products: action.payload,
          };
        }
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
