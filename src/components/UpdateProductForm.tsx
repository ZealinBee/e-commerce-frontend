import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { updateProduct } from "../redux/reducers/productsReducer";
import updateProductInterface from "../types/UpdateProduct";

interface UpdateProductFormProps {
  updateToggle: boolean;
  setUpdateToggle: (updateToggle: boolean) => void;
}

function UpdateProductForm({
  updateToggle,
  setUpdateToggle,
}: UpdateProductFormProps) {
  const dispatch = useAppDispatch();

  const [updateProductState, setUpdateProductState] =
    useState<updateProductInterface>({
      id: 0,
      title: "",
      price: 0,
    });

  async function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await dispatch(updateProduct(updateProductState));
    if (response.payload === "error") {
      toast.error("Update failed, enter a proper product ID");
      return;
    }
    setUpdateToggle(!updateToggle);
    setUpdateProductState({
      id: 0,
      title: "",
      price: 0,
    });
    toast.success("Update successfully!");
  }

  function formChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdateProductState({
      ...updateProductState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      {!updateToggle && (
        <div className="product-form-wrapper">
          <form onSubmit={formSubmitHandler} className="product-form">
            <TextField
              label="Product ID"
              name="id"
              style={{ marginBottom: "1rem" }}
              onChange={formChangeHandler}
            ></TextField>
            <TextField
              label="Product Name"
              name="title"
              style={{ marginBottom: "1rem" }}
              onChange={formChangeHandler}
            ></TextField>
            <TextField
              label="Product Price"
              name="price"
              style={{ marginBottom: "1rem" }}
              onChange={formChangeHandler}
              type="number"
            ></TextField>
            <Button
              variant="contained"
              style={{ marginBottom: "1rem" }}
              type="submit"
            >
              Update Product
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setUpdateToggle(!updateToggle)}
            >
              Cancel
            </Button>
            <Typography sx={{ mt: "1rem" }}>
              You can also update the product directly in the product page
            </Typography>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateProductForm;
