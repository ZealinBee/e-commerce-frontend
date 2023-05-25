import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import {
  deleteProduct,
  updateProduct,
  selectProduct
} from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartReducer";
import Header from "../components/Header";
import ConfirmationPrompt from "../components/ConfirmationPrompt";

function ProductPage() {
  const selectedProduct = useAppSelector(
    (state) => state.productsReducer.selectedProduct
  );
  let isAdmin = false;
  const [confirmationPrompt, setConfirmationPrompt] = useState<boolean>(false);

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
    }
  }

  function deleteProductHandler() {
    setConfirmationPrompt(true);
  }

  async function handleConfirmation() {
    setConfirmationPrompt(false);
    if (selectedProduct) {
      await dispatch(deleteProduct(selectedProduct.id));
      alert(`${selectedProduct.title} deleted successfully!`);
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
      await dispatch(selectProduct(selectedProduct))
      alert(`${selectedProduct?.title} updated successfully!`);
      navigate("/");
    }else {
      alert("Please enter valid values");
    }
  }

  return (
    <>
      <Header></Header>
      <div className="product-container">
        <div className="image-wrapper">
          <img src={`${selectedProduct?.images[0]}`} alt="" />
        </div>
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
          <Button variant="outlined" onClick={addToCartHandler}>
            Add to cart
          </Button>
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
    </>
  );
}

export default ProductPage;
