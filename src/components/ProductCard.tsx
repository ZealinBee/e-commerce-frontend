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
import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { addToCart } from "../redux/reducers/cartReducer";
import { selectProduct } from "../redux/reducers/productsReducer";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.items);
  const isItemInCart = useAppSelector((state) =>
    state.cartReducer.items.find((item) => item.product.id === product.id)
  );

  function addToCartHandler() {
    dispatch(addToCart(product));
  }

  function selectProductHandler() {
    dispatch(selectProduct(product));
  }

  let description = product.description;
  let truncatedDescription =
    description.length > 80
      ? description.substring(0, 80) + "..."
      : description;

  return (
    <Card>
      <Link
        to={`/products/${product.id}`}
        className="card-link"
        onClick={selectProductHandler}
      >
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
              €{product.price}.00
            </Typography>
            <Typography>{truncatedDescription}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions>
        {isItemInCart ? (
          <Button disabled>Added to cart</Button>
        ) : (
          <Button onClick={addToCartHandler}>Add to cart</Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
