import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../types/Product";
import SimpleProduct from "../../types/simpleProduct";
import updateProductInterface from "../../types/updateProduct";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: null | string;
  searchResults: Product[];
  sortByCategory: string | null;
  sortByPrice: "asc" | "desc" | "Default";
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchResults: [],
  sortByCategory: null,
  sortByPrice: "Default",
  selectedProduct: null,
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
      const products = result.data;
      const searchResults = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
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

export const sortByCategory = createAsyncThunk(
  "products/sortByCategory",
  async (category: string) => {
    try {
      const result = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products`
      );
      const products = result.data;
      const sortedProducts = products.filter(
        (product) =>
          product.category.name.toLowerCase() === category.toLowerCase()
      );
      return sortedProducts;
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

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (product: SimpleProduct) => {
    try {
      const result = await axios.post<SimpleProduct>(
        `https://api.escuelajs.co/api/v1/products`,
        product
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: updateProductInterface) => {
    try {
      const result = await axios.put<updateProductInterface>(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        product
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    try {
      const result = axios.delete(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return result;
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
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    sortProductByPrice: (
      state,
      action: PayloadAction<"asc" | "desc" | "Default">
    ) => {
      state.sortByPrice = action.payload;
      if (action.payload === "Default") {
        state.products.sort((a, b) => a.id - b.id);
      } else {
        state.products.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;

          if (action.payload === "asc") {
            return priceA - priceB;
          } else if (action.payload === "desc") {
            return priceB - priceA;
          }
          return 0;
        });
      }
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
      })
      .addCase(sortByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.sortByCategory = action.meta.arg;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const updatedProducts = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
        state.products = updatedProducts;
      });
  },
});

export const { selectProduct, sortProductByPrice } = productsSlice.actions;

const productsReducer = productsSlice.reducer;
export default productsReducer;
