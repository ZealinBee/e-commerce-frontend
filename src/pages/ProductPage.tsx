import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ToastContainer, toast } from "react-toastify";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import {
  deleteProduct,
  updateProduct,
  selectProduct,
} from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartReducer";
import Header from "../components/Header";
import ConfirmationPrompt from "../components/ConfirmationPrompt";
import { removeFromCart } from "../redux/reducers/cartReducer";

function ProductPage() {
  const selectedProduct = useAppSelector(
    (state) => state.productsReducer.selectedProduct
  );
  let isAdmin = false;
  const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(false);
  const isItemInCart = useAppSelector((state) =>
    state.cartReducer.items.find(
      (item) => item.product.id === selectedProduct?.id
    )
  );

  const navigate = useNavigate();
  if (
    useAppSelector((state) => state.usersReducer.currentUser?.role === "admin")
  ) {
    isAdmin = true;
  }
  const dispatch = useAppDispatch();

  function addToCartHandler() {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      toast.success(`${selectedProduct.title} added to cart!`);
    }
  }

  function deleteProductHandler() {
    setConfirmationPrompt(true);
  }

  async function handleConfirmation() {
    setConfirmationPrompt(false);
    if (selectedProduct) {
      await dispatch(deleteProduct(selectedProduct.id));
      await dispatch(removeFromCart(selectedProduct.id));
      await alert(`${selectedProduct.title} deleted successfully!`);
      navigate("/");
    }
  }

  function handleCancel() {
    setConfirmationPrompt(false);
  }

  async function updateProductHandler() {
    const id = selectedProduct?.id;
    const title = prompt("Enter new product name");
    const price = Number(prompt("Enter new price"));
    if (id && title && price) {
      await dispatch(updateProduct({ id, title, price }));
      await dispatch(selectProduct(selectedProduct));
      alert(`${selectedProduct?.title} updated successfully!`);
      navigate("/");
    } else {
      alert("Please enter valid values");
    }
  }

  return (
    <Box sx={{backgroundColor: "background.default", color:"text.primary"}}>
      <Header></Header>
      <div className="product-container">
        <Carousel className="carousel">
          <div className="image-wrapper">
            <img src={`${selectedProduct?.images[0]}`} alt="" />
          </div>
          <div className="image-wrapper">
            <img src={`${selectedProduct?.images[1]}`} alt="" />
          </div>
          <div className="image-wrapper">
            <img src={`${selectedProduct?.images[2]}`} alt="" />
          </div>
        </Carousel>
        <div className="product-details">
          <Typography variant="h5" sx={{ mb: "0.5rem" }}>
            {selectedProduct?.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: "0.5rem" }}>
            {selectedProduct?.category.name}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mb: "0.5rem" }}>
            {" "}
            €{selectedProduct?.price}.00
          </Typography>
          <Typography sx={{ mb: "0.5rem" }}>
            {selectedProduct?.description}
          </Typography>
          {isItemInCart ? (
            <Button disabled variant="outlined">
              Added to cart
            </Button>
          ) : (
            <Button onClick={addToCartHandler} variant="outlined" color="secondary">
              Add to cart
            </Button>
          )}
          {isAdmin ? (
            <>
              <Button onClick={updateProductHandler}>Update Product</Button>
              <Button color="secondary" onClick={deleteProductHandler}>
                Delete Product
              </Button>{" "}
              {confirmationPrompt ? (
                <ConfirmationPrompt
                  handleCancel={handleCancel}
                  handleConfirmation={handleConfirmation}
                  action="delete the product"
                ></ConfirmationPrompt>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />{" "}
    </Box>
  );
}

export default ProductPage;
