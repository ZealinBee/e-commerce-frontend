import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from '@mui/icons-material/Update';

import AddProductForm from "../components/AddProductForm";
import Headers from "../components/Header";
import UpdateProductForm from "../components/UpdateProductForm";

function Modification() {
  const [addToggle, setAddToggle] = useState(true);
  const [updateToggle, setUpdateToggle] = useState(true);
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="modification">
          <h1>Modification</h1>
          <Button variant="contained" onClick={() => setAddToggle(!addToggle)}>
            Add a Product<AddIcon></AddIcon>
          </Button>
          <Button variant="contained" onClick={() => setUpdateToggle(!updateToggle)}>
            Update a Product  <UpdateIcon></UpdateIcon>
          </Button>
          <Button variant="outlined">
            Delete a Product <DeleteIcon></DeleteIcon>
          </Button>
        </div>
        <AddProductForm
          addToggle={addToggle}
          setAddToggle={setAddToggle}
        ></AddProductForm>
        <UpdateProductForm
          updateToggle={updateToggle}
          setUpdateToggle={setUpdateToggle}
        ></UpdateProductForm>
      </div>
    </>
  );
}

export default Modification;
