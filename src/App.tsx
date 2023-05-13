import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import "./styles/styles.scss";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: '#9BC1BC', 
    },
    secondary: {
      main: '#ED6A5A', 
    },
  },

});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage></ProductPage>} />
            <Route path="/users/:id" element={<ProfilePage></ProfilePage>} />
            <Route path="*" element={<NotFoundPage></NotFoundPage>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
