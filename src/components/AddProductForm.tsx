import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewProduct } from "../redux/reducers/productsReducer";
import SimpleProduct from "../types/SimpleProduct";

interface AddProductFormProps {
  addToggle: boolean;
  setAddToggle: (addToggle: boolean) => void;
}

function AddProductForm({ addToggle, setAddToggle }: AddProductFormProps) {
  const dispatch = useAppDispatch();
  const [newProduct, setNewProduct] = useState<SimpleProduct>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });
  function formChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  }

  function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(createNewProduct(newProduct));
    console.log(newProduct);
  }

  return (
    <>
      {!addToggle && (
        <form className="product-form" onSubmit={formSubmitHandler}>
          <TextField
            label="Product Id"
            name="id"
            value={newProduct.id}
            onChange={formChangeHandler}
            type="number"
          ></TextField>
          <TextField
            label="Product Name"
            name="title"
            value={newProduct.title}
            onChange={formChangeHandler}
          ></TextField>
          <TextField
            label="Product Price"
            name="price"
            value={newProduct.price}
            onChange={formChangeHandler}
            type="number"
          ></TextField>
          <TextField
            label="Product Description"
            name="description"
            value={newProduct.description}
            onChange={formChangeHandler}
          ></TextField>
          <TextField
            name="images"
            value={newProduct.images}
            onChange={formChangeHandler}
            label={`Image URL`}
          ></TextField>
          <TextField
            name="categoryId"
            label="Category ID"
            value={newProduct.categoryId}
            onChange={formChangeHandler}
            type="number"
          ></TextField>
          <Button variant="outlined" type="submit">
            Submit Product
          </Button>
        </form>
      )}
    </>
  );
}

export default AddProductForm;
