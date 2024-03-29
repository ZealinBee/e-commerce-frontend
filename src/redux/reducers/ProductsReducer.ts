import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

import Product from "../../types/Product";
import SimpleProduct from "../../types/SimpleProduct";
import updateProductInterface from "../../types/UpdateProduct";
import { GlobalState } from "../store";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: null | string;
  searchResults: Product[];
  filterByCategory: string | null;
  sortByPrice: "asc" | "desc" | "Default";
  selectedProduct: Product | null;
  currentSearchTerm: string;
  hasFetched: boolean;
  productsStore: Product[];
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchResults: [],
  filterByCategory: null,
  sortByPrice: "Default",
  selectedProduct: null,
  currentSearchTerm: "",
  hasFetched: false,
  productsStore: [],
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products`
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
  async (query: string, {getState}) => {
    try {
      const currentState = getState() as GlobalState
      const products = currentState.productsReducer.productsStore 
      if(query === "") return products
      const sortByPrice = currentState.productsReducer.sortByPrice
       let searchResults = products.filter((product : Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      if(searchResults.length === 0) throw new Error("No results found")
      if(sortByPrice !== "Default") {
        searchResults.sort((a, b) => {
          const priceA = a.price;
          const priceB = b.price;
          if (sortByPrice === "asc") {
            return priceA - priceB;
          } else if (sortByPrice === "desc") {
            return priceB - priceA;
          }
          return 0;
        });
      }
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

export const filterByCategory = createAsyncThunk(
  "products/filterByCategory",
  async (category:string , {getState}) => {
    try {
      const currentState = getState() as GlobalState
      const products = currentState.productsReducer.productsStore
      let filteredProducts = products.filter(
        (product : Product) =>
        product.category.name.toLowerCase() === category.toLowerCase()
      );
      return filteredProducts;
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
    cleanUpProductReducer: (state) => {
      return initialState;
    },
    setCurrentSearchTerm: (state, action: PayloadAction<string>) => {
      state.currentSearchTerm = action.payload;
    }
    
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            products: action.payload,
            productsStore: action.payload,
            hasFetched: true,
          };
        }
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.products = action.payload;
      })
      .addCase(filterByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filterByCategory = action.meta.arg;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const updatedProducts = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
        state.products = updatedProducts;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        action.payload = "error"
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        action.payload = "error"
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        action.payload = "error"
        state.error = action.error.message || "Failed to create a new product";
      })
      .addCase(searchProduct.rejected, (state, action) => {
        action.payload = "error"
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload as Product;
        state.products = state.products.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        })
        
      })
  },
});

export const { selectProduct, sortProductByPrice, cleanUpProductReducer, setCurrentSearchTerm } =
  productsSlice.actions;

const productsReducer = productsSlice.reducer;
export default productsReducer;
