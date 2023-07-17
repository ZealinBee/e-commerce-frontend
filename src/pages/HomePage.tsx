import React from "react";
import { ToastContainer } from "react-toastify";

import Header from "../components/Header";
import ProductList from "../components/ProductList";

function HomePage() {
  return (
    <>
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
    </>
  );
}

export default HomePage;
