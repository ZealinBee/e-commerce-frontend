import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";

import AddProductForm from "../components/AddProductForm";
import Headers from "../components/Header";
import UpdateProductForm from "../components/UpdateProductForm";
import DeleteProductForm from "../components/DeleteProductForm";
import useAppSelector from "../redux/hooks/useAppSelectors";

function Modification() {
  const [addToggle, setAddToggle] = useState(true);
  const [updateToggle, setUpdateToggle] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(true);
  const navigate = useNavigate();
  const isAdmin =
    useAppSelector((state) => state.usersReducer.currentUser?.role) === "admin";
  const isLoggedIn = useAppSelector((state) => state.usersReducer.isLoggedIn);

  if (!isAdmin || !isLoggedIn) {
    navigate("/login");
  }

  return (
    <>
      <Headers></Headers>
      <Box sx={{backgroundColor:"background.default", color:"text.primary", minHeight:"95vh"}}>

      <div className="wrapper">
        <div className="modification">
          <h1>Manage Products</h1>
          <Button variant="contained" onClick={() => setAddToggle(!addToggle)}>
            Add a Product<AddIcon></AddIcon>
          </Button>
          <Button
            variant="contained"
            onClick={() => setUpdateToggle(!updateToggle)}
          >
            Update a Product <UpdateIcon></UpdateIcon>
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDeleteToggle(!deleteToggle)}
          >
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
        <DeleteProductForm
          deleteToggle={deleteToggle}
          setDeleteToggle={setDeleteToggle}
        ></DeleteProductForm>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </Box>
    </>
  );
}

export default Modification;
