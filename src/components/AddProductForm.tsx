import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

import useAppDispatch from "../redux/hooks/useAppDispatch";
import { createNewProduct } from "../redux/reducers/productsReducer";
import SimpleProduct from "../types/SimpleProduct";
import useAppSelector from "../redux/hooks/useAppSelectors";
import { SelectChangeEvent } from "@mui/material";

interface AddProductFormProps {
  addToggle: boolean;
  setAddToggle: (addToggle: boolean) => void;
}

function AddProductForm({ addToggle, setAddToggle }: AddProductFormProps) {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("1");
  const [newProduct, setNewProduct] = useState<SimpleProduct>({
    title: "",
    price: 0,
    description: "",
    categoryId: parseInt(category),
    images: images,
  });

  function categoryChangeHandler(event: SelectChangeEvent<string>) {
    setCategory(event.target.value);
    setNewProduct({
      ...newProduct,
      categoryId: parseInt(category),
    });
  }

  function formChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  }

  async function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await dispatch(createNewProduct(newProduct));
    if (response.payload === "error") {
      toast.error("Create failed, please check your input");
      return;
    }
    setAddToggle(!addToggle);
    toast.success(`${newProduct.title} created successfully!}`);
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
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
        <div className="product-form-wrapper">
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
            <Typography>Image URL format: url,url,url,</Typography>
            <TextField
              value={images}
              onChange={imageChangeHandler}
              label={`Image URL`}
              style={{ marginBottom: "1rem" }}
            ></TextField>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              style={{ marginBottom: "1rem" }}
              value={category}
              onChange={categoryChangeHandler}
            >
              {categories.map((cate) => (
                <MenuItem value={cate.id} key={cate.id}>
                  {cate.name}
                </MenuItem>
              ))}
            </Select>
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
        </div>
      )}
    </>
  );
}

export default AddProductForm;
