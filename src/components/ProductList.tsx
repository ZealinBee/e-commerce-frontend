import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import useAppDispatch from "../redux/hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/ProductsReducer";
import useAppSelector from "../redux/hooks/useAppSelectors";

import ProductCard from "./ProductCard";
import Product from "../types/Product";

function ProductList() {
  const products = useAppSelector((state) => state.productsReducer.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Grid className="product-list" container spacing={3}>
      {products.map((product: Product) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductList;
