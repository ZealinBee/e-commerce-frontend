import {configureStore} from "@reduxjs/toolkit";

import productsReducer from "../redux/reducers/productsReducer";
import usersReducer from "../redux/reducers/usersReducer";
import cartReducer from "../redux/reducers/cartReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        cartReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store