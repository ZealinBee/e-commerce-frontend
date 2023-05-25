import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        cartReducer,
        categoriesReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store