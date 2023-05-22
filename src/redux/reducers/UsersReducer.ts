import axios from "axios";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../../types/User";

const initialState: User[] = [];

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const result = await axios.get<User[]>("https://api.escuelajs.co/api/v1/users");
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
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchAllUsers.fulfilled, (state, action) => {
        if(action.payload) {
            return action.payload
        }
    })
  },
});

const usersReducer = usersSlice.reducer;
export const { createUser } = usersSlice.actions;
export default usersReducer;
