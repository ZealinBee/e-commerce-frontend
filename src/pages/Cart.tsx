import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import Header from "../components/Header";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { removeFromCart } from "../redux/reducers/cartReducer";

function Cart() {
  let totalCost = 0;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  return (
    <>
      <Header></Header>
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
            totalCost += item.product.price * item.quantity;

            return (
              <div className="cart-item" key={item.product.id}>
                <div className="cart-item__image-wrapper">
                  <img src={`${item.product.images}`} alt="" />
                </div>
                <p className="cart-item__title">{item.product.title}</p>
                <p className="cart-item__quantity">{item.quantity}</p>
                <p className="cart-item__price"> €{item.product.price}.00</p>
                <p className="cart-item__subtotal">
                  €{item.product.price * item.quantity}.00
                </p>

                <DeleteIcon
                  onClick={() => dispatch(removeFromCart(item.product))}
                ></DeleteIcon>
              </div>
            );
          })}
        </div>
        <div className="cart-total">
          <h3>Summary</h3>
          <p>Total: €{totalCost}.00</p>
        </div>
      </div>
    </>
  );
}

export default Cart;
