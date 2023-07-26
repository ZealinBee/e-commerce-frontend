import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { TextField, Button, Pagination } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import {
  fetchAllProducts,
  searchProduct,
  sortProductByPrice,
  setCurrentSearchTerm
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
  const hasFetched = useAppSelector((state) => state.productsReducer.hasFetched);
  const productsPerPage = 6;
  const [page, setPage] = useState(1);
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(hasFetched === false) {
      dispatch(fetchAllProducts());
    }else {
      return;
    }
  }, [dispatch, hasFetched]);

  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const response = await dispatch(searchProduct(query));
    if (response.payload === "error") {
      toast.warn(`Can't find product ${query}`, {
        theme: "light",
      });
    }
    dispatch(setCurrentSearchTerm(query))
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
          sx={{ padding: {md: "1rem 2rem 1rem 2rem", xs: "0 1.5rem 0 0"}  }}
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
      <Pagination
        count={Math.ceil(products.length / productsPerPage)}
        className="pagination"
        onChange={handlePageChange}
      />
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
      />
    </div>
  );
}

export default ProductList;
