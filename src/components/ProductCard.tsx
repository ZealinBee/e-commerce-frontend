import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import Product from "../types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <Link to={`/products/${product.id}`} className="card-link">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`${product.images}`}
            alt="product"
          ></CardMedia>
          <CardContent>
            {" "}
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="body2" color="primary">
              {product.price}
            </Typography>
            <Typography>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions>
        {" "}
        <Button>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
