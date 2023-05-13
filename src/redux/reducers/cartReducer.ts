import {
  CartAction,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/cartAction";
import Product from "../../types/Product";

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
