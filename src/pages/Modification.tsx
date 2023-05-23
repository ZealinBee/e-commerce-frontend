import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import AddProductForm from "../components/AddProductForm";
import Headers from "../components/Header";

function Modification() {
  const [addToggle, setAddToggle] = useState(true);
  return (
    <>
    <Headers></Headers>
      <Button variant="contained" onClick={() => setAddToggle(!addToggle)}>
        Add a Product<AddIcon></AddIcon>
      </Button>
      <Button variant="outlined">
        Delete a Product <DeleteIcon></DeleteIcon>
      </Button>

      <AddProductForm
        addToggle={addToggle}
        setAddToggle={setAddToggle}
      ></AddProductForm>
    </>
  );
}

export default Modification;
