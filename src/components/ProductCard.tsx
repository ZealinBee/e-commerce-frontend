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
import { toast } from "react-toastify";

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
  const isItemInCart = useAppSelector((state) =>
    state.cartReducer.items.find((item) => item.product.id === product.id)
  );

  function addToCartHandler() {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  }

  function selectProductHandler() {
    dispatch(selectProduct(product));
  }

  let description = product.description;
  let truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  return (
    <Card sx={{backgroundColor: "background.default", height:{md: "330px",xs: "300px"}}} >
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
            <Typography variant="h5" sx={{fontSize:{xs:"1.1rem", md: "1.5rem"}}} >{product.title}</Typography>
            <Typography variant="body2" color="primary">
              €{product.price}.00
            </Typography>
            <Typography sx={{fontSize: {md:"1rem",xs:"0.8rem"}}}>{truncatedDescription}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions >
        {isItemInCart ? (
          <Button disabled >Added to cart</Button>
        ) : (
          <Button onClick={addToCartHandler} color="secondary">Add to cart</Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
