import React from "react";
import { TextField, Button } from "@mui/material";

interface UpdateProductFormProps {
  updateToggle: boolean;
  setUpdateToggle: (updateToggle: boolean) => void;
}

function UpdateProductForm({
  updateToggle,
  setUpdateToggle,
}: UpdateProductFormProps) {
  return (
    <>
      {!updateToggle && (
        <form>
          <TextField
            label="Product ID"
            name="id"
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            label="Product Name"
            name="title"
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <TextField
            label="Product Price"
            name="price"
            style={{ marginBottom: "1rem" }}
          ></TextField>
          <Button variant="contained">Update Product</Button>
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
