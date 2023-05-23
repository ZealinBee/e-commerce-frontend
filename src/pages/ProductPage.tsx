import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { selectProduct } from "../redux/reducers/productsReducer";
import { addToCart } from "../redux/reducers/cartReducer";

function ProductPage() {
  const selectedProduct = useAppSelector(
    (state) => state.productsReducer.selectedProduct
  );
  useEffect(() => {
    // const fetchedProduct: Product
  }, []);

  const dispatch = useAppDispatch();

  function addToCartHandler() {
    // dispatch(addToCart(selectedProduct));
  }

  return (
    <>
      <div className="product-container">
        <div className="image-wrapper">
          <img src={`${selectedProduct?.images[0]}`} alt="" />
        </div>
        <div className="product-details">
          <Typography variant="h5">{selectedProduct?.title}</Typography>
          <Typography variant="h6">{selectedProduct?.category.name}</Typography>
          <Typography variant="h5">{selectedProduct?.price}</Typography>
          <Button variant="outlined" onClick={addToCartHandler}>
            Add to cart
          </Button>
          <Typography>{selectedProduct?.description}</Typography>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
