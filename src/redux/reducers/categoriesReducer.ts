import Category from "../../types/Category";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryState {
  categories: Category[] | [];
}

const initialState: CategoryState = {
  categories: [],
};

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async () => {
    try {
      const result = await axios.get<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const categories = result.data;
      
      const uniqueCategories: Category[] = [];
      const filteredCategories: Category[] = [];
      
      categories.forEach(category => {
        if (!uniqueCategories.some(existingCategory => existingCategory.name === category.name)) {
          uniqueCategories.push(category);
          filteredCategories.push(category);
        }
      });
      
      return filteredCategories;
      
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {} = categoriesSlice.actions;

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
