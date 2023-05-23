import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import {
  fetchAllProducts,
  searchProduct,
  sortByCategory,
  sortProductByPrice,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../redux/hooks/useAppSelectors";
import ProductCard from "./ProductCard";
import Product from "../types/Product";
import SortByCate from "../components/SortByCate";
import SortByPrice from "../components/SortByPrice";

function ProductList() {
  const products = useAppSelector((state) => {
    if (state.productsReducer.searchResults.length > 0) {
      return state.productsReducer.searchResults;
    } else {
      return state.productsReducer.products;
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

  const handleSortByCategory = (category: string) => {
    dispatch(sortByCategory(category));
  };

  const handleSortByPrice = (direction: "asc" | "desc" | "Default") => {
    dispatch(sortProductByPrice(direction));
  };

  return (
    <>
      <div className="filter">
        <div className="search">
          <TextField
            onChange={(e) => setQuery(e.target.value)}
            label="Search by name"
            variant="outlined"
          />
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
        </div>

        <SortByCate onSortByCategory={handleSortByCategory}></SortByCate>
        <SortByPrice onSortByPrice={handleSortByPrice}></SortByPrice>
      </div>

      <Grid
        className="product-list"
        container
        spacing={3}
        sx={{ padding: " 1rem 2rem" }}
      >
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
