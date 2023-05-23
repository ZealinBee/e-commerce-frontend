import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { fetchAllProducts,searchProduct, sortByCategory } from "../redux/reducers/productsReducer";
import useAppSelector from "../redux/hooks/useAppSelectors";
import ProductCard from "./ProductCard";
import Product from "../types/Product";
import SortByCate from "../components/SortByCate"
import SortByPrice from "../components/SortByPrice"
import { sortProductByPrice } from "../redux/actions/productAction";


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

  const handleSortByCategory = (category: string) => {
    dispatch(sortByCategory(category));
  };

  const handleSortByPrice = (direction: "asc" | "desc") => {
    dispatch(sortProductByPrice(direction));
  }

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} style={{marginBottom:"3rem"}}></input>
      <button onClick={handleSearch}>Search</button>
      <SortByCate onSortByCategory={handleSortByCategory} ></SortByCate>
      <SortByPrice onSortByPrice = {handleSortByPrice}></SortByPrice>
      <Link to="/cart">Cart</Link>
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
