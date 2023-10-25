import CartItem from "../types/Cart";

export const saveToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

export const loadFromLocalStorage = () : CartItem[] | null => {
  const items = localStorage.getItem("cartItems");
  if (items) {
    return JSON.parse(items);
  } else {
    return null;
  }
};
