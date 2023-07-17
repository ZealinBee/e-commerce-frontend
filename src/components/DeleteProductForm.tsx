import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { deleteProduct } from "../redux/reducers/productsReducer";
import { removeFromCart } from "../redux/reducers/cartReducer";

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

  async function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await dispatch(deleteProduct(id));
    if (response.payload === "error") {
      toast.error("Delete failed, enter a proper product ID");
      return;
    }
    await dispatch(removeFromCart(id));
    setDeleteToggle(!deleteToggle);
    setId(0);
    toast.success("Delete successfully!");
  }

  return (
    <>
      {!deleteToggle && (
        <div className="product-form-wrapper">
          <form onSubmit={formSubmitHandler} className="product-form">
            <TextField
              label="Product ID"
              name="id"
              style={{ marginBottom: "1rem" }}
              onChange={(e) => setId(Number(e.target.value))}
            ></TextField>
            <Button
              variant="contained"
              style={{ marginBottom: "1rem" }}
              type="submit"
            >
              Delete Product
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setDeleteToggle(!deleteToggle)}
            >
              Cancel
            </Button>
            <Typography sx={{ mt: "1rem" }}>
              You can also delete the product directly in the product page
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default DeleteProductForm;
