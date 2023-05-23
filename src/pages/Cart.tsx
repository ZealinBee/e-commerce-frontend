import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import useAppSelector from "../redux/hooks/useAppSelectors";

function Cart() {
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  return (
    <>
      <Box>
        <Typography>Item Summary({totalItems})</Typography>
      </Box>
      {cartItems.map((item) => {
        return (
          <Box>
            <Typography>{item.product.title}</Typography>
            <Typography>{item.quantity}</Typography>
          </Box>
        );
      })}
    </>
  );
}

export default Cart;
