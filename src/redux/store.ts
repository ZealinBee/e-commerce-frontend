import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "./reducers/ProductsReducer";
import usersReducer from "./reducers/UsersReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store