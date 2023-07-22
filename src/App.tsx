import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import "./styles/styles.scss";
import Cart from "./pages/Cart";
import Modification from "./pages/Modification";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

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
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <NotFoundPage />,
  },
]);

type ChangeThemeFunction = () => void;
export const ThemeContext = React.createContext<ChangeThemeFunction>(() => {});

const App = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const changeMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    palette:
      mode === "light"
        ? {
            primary: {
              main: "#9BC1BC",
            },
            secondary: {
              main: "#ED6A5A",
            },
            background: {
              default: "#fcfafa",
            },
            text: {
              primary: "#282828",
              secondary: "#282828",
            },
          }
        : {
            primary: {
              main: "#5A7975",
            },
            background: {
              default: "#282828",
            },
            text: {
              primary: "#fcfafa",
              secondary: "#fcfafa",
            },
          },
  });

  return (
    <>
      <ThemeContext.Provider value={changeMode}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
