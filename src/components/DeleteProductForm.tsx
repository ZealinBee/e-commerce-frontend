import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { deleteProduct } from "../redux/reducers/productsReducer";

interface DeleteProductFormProps {
  deleteToggle: boolean;
  setDeleteToggle: (deleteToggle: boolean) => void;
}

function DeleteProductForm({
  deleteToggle,
  setDeleteToggle,
}: DeleteProductFormProps) {
  const [id, setId] = useState(0);
  const dispatch = useAppDispatch();

  function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(deleteProduct(id));
    setDeleteToggle(!deleteToggle);
    setId(0);
  }

  return (
    <>
      {!deleteToggle && (
        <form onSubmit={formSubmitHandler} className="product-form">
          <TextField
            label="Product ID"
            name="id"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => setId(Number(e.target.value))}
          ></TextField>
          <Button variant="contained" style={{ marginBottom: "1rem" }} type="submit">
            Delete Product
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setDeleteToggle(!deleteToggle)}>
            Cancel
          </Button>
          <Typography sx={{mt:"1rem"}}>You can also delete the product directly in the product page</Typography>

        </form>
      )}
    </>
  );
}

export default DeleteProductForm;
