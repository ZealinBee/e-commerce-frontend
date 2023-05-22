import Product from "../../types/Product";
import { ActionTypes } from "../constants/action-types";

export const setProducts = (products: Product[]) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProduct = (product: Product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};

export const searchProduct = (product: Product) => {
  return {
    type: ActionTypes.SEARCH_PRODUCT,
    payload: product,
  }
}