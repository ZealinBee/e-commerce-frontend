import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../types/Product";
import { Link } from "react-router-dom";

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
    <div className="product-list">
      {products.map((product) => {
        return <div key={product.id} className="product">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </div>;
      })}
    </div>
  );
}

export default ProductList;
