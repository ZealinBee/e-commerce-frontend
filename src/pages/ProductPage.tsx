import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { selectProduct } from "../redux/reducers/productsReducer";

function ProductPage() {
  const selectedProduct = useAppSelector(
    (state) => state.productsReducer.selectedProduct
  );
  useEffect(() => {
    // const fetchedProduct: Product
  }, []);

  return (
    <>
      <div className="container">
        <Box>
          <img src={`${selectedProduct?.images[0]}`} alt="" />
        </Box>
        <Box>
          <Typography variant="h5">{selectedProduct?.title}</Typography>
          <Typography variant="h6">{selectedProduct?.category.name}</Typography>
          <Typography variant="h5">{selectedProduct?.price}</Typography>
          <Button variant="outlined">Add to cart</Button>
          <Typography>{selectedProduct?.description}</Typography>
        </Box>
      </div>
    </>
  );
}

export default ProductPage;
