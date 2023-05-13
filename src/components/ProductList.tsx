import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import ProductCard from "./ProductCard";
import Product from "../types/Product";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response);
        } else {
          console.error(error);
        }
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <Grid className="product-list" container spacing={3}>
      {products.map((product) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} key={product.id}> 
            <ProductCard ></ProductCard>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductList;
