import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { selectProduct } from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartReducer";
import Header from "../components/Header";

function ProductPage() {
  const selectedProduct = useAppSelector(
    (state) => state.productsReducer.selectedProduct
  );
  useEffect(() => {
    // const fetchedProduct: Product
  }, []);

  const dispatch = useAppDispatch();

  function addToCartHandler() {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
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
        </div>
      </div>
    </>
  );
}

export default ProductPage;
