import { createSlice } from "@reduxjs/toolkit";

import  Product  from "../../types/Product";

const initialState = {
    product: [],
    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        
    } 
})

const productsReducer = productsSlice.reducer
export default productsReducer