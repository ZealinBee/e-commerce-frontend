import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { TextField, Button, Pagination } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import {
  fetchAllProducts,
  searchProduct,
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
  const productsPerPage = 6;
  const [page, setPage] = useState(1);
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    dispatch(searchProduct(query));
  };

  const handleSortByPrice = (direction: "asc" | "desc" | "Default") => {
    dispatch(sortProductByPrice(direction));
  };

  return (
    <div>
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
        <SortByPrice onSortByPrice={handleSortByPrice}></SortByPrice>
      </div>
      <div className="product-list-wrapper">
        <SortByCate></SortByCate>
        <Grid
          className="product-list"
          container
          spacing={2}
          sx={{ padding: " 1rem 2rem" }}
        >
          {paginatedProducts.map((product: Product) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}>
                <ProductCard product={product}></ProductCard>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Pagination count={Math.ceil(products.length / productsPerPage)} className="pagination" onChange={handlePageChange}/>
    </div>
  );
}

export default ProductList;
