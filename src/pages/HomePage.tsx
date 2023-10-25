import React from "react";
import { ToastContainer } from "react-toastify";
import { Box } from "@mui/system";

import Header from "../components/Header";
import ProductList from "../components/ProductList";

function HomePage() {

  return (
    <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
      <Header></Header>
      <ProductList></ProductList>
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
  );
}

export default HomePage;
