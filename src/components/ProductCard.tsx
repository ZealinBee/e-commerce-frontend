import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

function ProductCard() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/640/640?r=4393"
          alt="product"
        ></CardMedia>
        <CardContent>
          {" "}
          <Typography variant="h5">Handmade Wooden Chair</Typography>
          <Typography variant="body2" color="primary">$932.00</Typography>
          <Typography>
            Carbonite web goalkeeper gloves are ergonomically designed to give
            easy fit
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {" "}
        <Button>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
