import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";

function Cart() {
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="cart-product-info">
        <h5>Product</h5>
        <h5>Quantity</h5>
        <h5>Price</h5>
        <h5>Subtotal</h5>
      </div>
      <div className="cart">
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div className="cart-item">
                <div className="cart-item__image-wrapper">
                  <img src={`${item.product.images}`} alt="" />
                </div>
                <p className="cart-item__title">{item.product.title}</p>
                <p className="cart-item__quantity">{item.quantity}</p>
                <p className="cart-item__price"> €{item.product.price}.00</p>
                <p className="cart-item__subtotal">
                  €{item.product.price * item.quantity}.00
                </p>
              </div>
            );
          })}
        </div>
        <div className="cart-total">
          <h3>Summary</h3>
          <p>Total: €{totalItems}.00</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
