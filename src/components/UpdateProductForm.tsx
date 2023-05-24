import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { updateProduct } from "../redux/reducers/productsReducer";
import updateProductInterface from "../types/updateProduct";

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

  function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateProduct(updateProductState));
    setUpdateToggle(!updateToggle);
    setUpdateProductState({
      id: 0,
      title: "",
      price: 0,
    });
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
        <form onSubmit={formSubmitHandler}>
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
        </form>
      )}
    </>
  );
}

export default UpdateProductForm;
