import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import "./styles/styles.scss";
import Cart from "./pages/Cart";
import Modification from "./pages/Modification";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#9BC1BC",
    },
    secondary: {
      main: "#ED6A5A",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/users/:id",
    element: <ProfilePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/modification",
    element: <Modification />,
    errorElement: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
