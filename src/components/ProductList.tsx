import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { fetchAllProducts,searchProduct } from "../redux/reducers/ProductsReducer";
import useAppSelector from "../redux/hooks/useAppSelectors";
import ProductCard from "./ProductCard";
import Product from "../types/Product";

function ProductList() {
  const products = useAppSelector((state) => {
    if(state.productsReducer.searchResults.length > 0){
      return state.productsReducer.searchResults
    }else {
      return state.productsReducer.products
    }
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [query, setQuery] = useState("");
  
  const handleSearch = () => {
    dispatch(searchProduct(query));
  };

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} style={{marginBottom:"3rem"}}></input>
      <button onClick={handleSearch}>Search</button>
      <Grid className="product-list" container spacing={3}>
        {products.map((product: Product) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
              <ProductCard product={product}></ProductCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ProductList;
