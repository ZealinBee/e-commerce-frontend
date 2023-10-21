import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import User from "../../types/User";
import simpleUser from "../../types/SimpleUser";
import loginUserI from "../../types/LoginUser";

interface UsersState {
  users: User[];
  loading: boolean;
  error: null | string;
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
  isLoggedIn: false,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const result = await axios.get<User[]>(
      "https://api.escuelajs.co/api/v1/users"
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
});

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (user: simpleUser) => {
    try {
      const result = await axios.post<simpleUser>(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        const warningMessage = responseData.message;
        throw new Error(warningMessage);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

export const authenticate = createAsyncThunk(
  "authenticate",
  async (access_token: string) => {
    try {
      const authentication = await axios.get<User>(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return authentication.data;
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

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user: loginUserI, { dispatch }) => {
    try {
      const response = await axios.post<{ access_token: string }>(
        "https://api.escuelajs.co/api/v1/auth/login",
        user
      );
      const authentication = await dispatch(
        authenticate(response.data.access_token)
      );
      return authentication.payload as User;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        throw new Error(error.response?.data?.message || "Wrong credentials");
      } else {
        console.error(error);
        throw new Error("Wrong credentials");
      }
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser(state) {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    emptyUsersReducer(state) {
      state.users = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            users: action.payload,
          };
        }
      })
      .addCase(fetchAllUsers.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          currentUser: action.payload,
          isLoggedIn: true,
          loading: false,
          error: null,
        };
      })
      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        action.payload = "error"
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = action.error.name as string;
      });
  },
});

const usersReducer = usersSlice.reducer;
export const { logoutUser, emptyUsersReducer } = usersSlice.actions;
export default usersReducer;
