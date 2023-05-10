import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage></ProductPage>} />
          <Route path="/users/:id" element={<ProductPage></ProductPage>} />
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
