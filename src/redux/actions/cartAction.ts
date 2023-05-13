import Product from "../../types/Product";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: Product;
}

export type CartAction = AddToCartAction | RemoveFromCartAction;

export const addToCart = (product: Product): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product: Product): RemoveFromCartAction => ({
  type: REMOVE_FROM_CART,
  payload: product,
});
