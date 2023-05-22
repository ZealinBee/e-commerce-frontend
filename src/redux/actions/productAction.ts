import Product from "../../types/Product";
import { ActionTypes } from "../constants/action-types";

export const sortProductByPrice = (price: string) => {
  return {
    type: ActionTypes.SORT_PRODUCT_BY_PRICE,
    
  }
}