import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewProduct } from "../redux/reducers/productsReducer";
import SimpleProduct from "../types/SimpleProduct";

interface AddProductFormProps {
  addToggle: boolean;
  setAddToggle: (addToggle: boolean) => void;
}

function AddProductForm({ addToggle, setAddToggle }: AddProductFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<SimpleProduct>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: images,
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
    setAddToggle(!addToggle);
    setNewProduct({
      id: 0,
      title: "",
      price: 0,
      description: "",
      categoryId: 0,
      images: images,
    });
  }

  function imageChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setImages(e.target.value.split(","));
    setNewProduct({
      ...newProduct,
      images: images,
    });
  }

  return (
    <>
      {!addToggle && (
        <form className="product-form" onSubmit={formSubmitHandler}>
          <TextField
            label="Product Name"
            name="title"
            value={newProduct.title}
            onChange={formChangeHandler}
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            label="Product Price"
            name="price"
            value={newProduct.price}
            onChange={formChangeHandler}
            type="number"
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            label="Product Description"
            name="description"
            value={newProduct.description}
            onChange={formChangeHandler}
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            value={images}
            onChange={imageChangeHandler}
            label={`Image URL`}
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            name="categoryId"
            label="Category ID"
            value={newProduct.categoryId}
            onChange={formChangeHandler}
            type="number"
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <Button variant="contained" type="submit">
            Submit Product
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: "1rem" }}
            onClick={() => setAddToggle(!addToggle)}
          >
            Cancel
          </Button>
        </form>
      )}
    </>
  );
}

export default AddProductForm;
