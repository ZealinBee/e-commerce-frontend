import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { removeFromCart, emptyCart } from "../redux/reducers/cartReducer";
import ConfirmationPrompt from "../components/ConfirmationPrompt";

function Cart() {
  let totalCost = 0;
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const [showPrompt, setShowPrompt] = useState(false);

  function emptyCartHandler() {
    setShowPrompt(true);
  }

  function handleCancel() {
    setShowPrompt(false);
  }

  function handleConfirmation() {
    dispatch(emptyCart());
    setShowPrompt(false);
  }

  function handleDeleteItem() {
    setShowPrompt(true);
  }

  return (
    <>
      <Header></Header>
      {cartItems.length === 0 ? (
        <>
          <h2 style={{ marginLeft: "1.5rem" }}>Cart is empty</h2>
          <Link to="/" style={{ marginLeft: "1.5rem" }}>
            Go shopping
          </Link>
        </>
      ) : (
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
                totalCost += item.product.price * item.quantity;
                return (
                  <div className="cart-item" key={item.product.id}>
                    <div className="cart-item__image-wrapper">
                      <img
                        src={`${
                          item.product.images
                            ? item.product.images
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                        }`}
                        alt=""
                      />
                    </div>
                    <p className="cart-item__title">{item.product.title}</p>
                    <p className="cart-item__quantity">{item.quantity}</p>
                    <p className="cart-item__price">
                      {" "}
                      €{item.product.price}.00
                    </p>
                    <p className="cart-item__subtotal">
                      €{item.product.price * item.quantity}.00
                    </p>
                    <p>
                      {" "}
                      <DeleteIcon onClick={handleDeleteItem}></DeleteIcon>
                      {showPrompt ? (
                        <ConfirmationPrompt
                          handleCancel={handleCancel}
                          handleConfirmation={handleConfirmation}
                          action={`delete ${item.product.title}`}
                        ></ConfirmationPrompt>
                      ) : null}
                    </p>
                  </div>
                );
              })}
              <Button
                variant="contained"
                sx={{ width: "200px", marginLeft: "4rem" }}
                onClick={emptyCartHandler}
              >
                Empty Cart
                <DeleteIcon></DeleteIcon>
              </Button>
              {showPrompt ? (
                <ConfirmationPrompt
                  action="empty cart"
                  handleCancel={handleCancel}
                  handleConfirmation={handleConfirmation}
                ></ConfirmationPrompt>
              ) : null}
            </div>
            <div className="cart-total">
              <h3>Summary</h3>
              <p>Shipping cost: €0.00</p>
              <p>Subtotal: €{totalCost}.00</p>
              <p>Total: €{totalCost}.00</p>
              <Button variant="contained" sx={{ mt: "1rem" }} fullWidth>
                Check out now
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
