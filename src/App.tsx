import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/styles.scss";
import Cart from "./pages/Cart";
import Modification from "./pages/Modification";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";
import useAppSelector from "./redux/hooks/useAppSelectors";
import useAppDispatch from "./redux/hooks/useAppDispatch";
import { updateCart } from "./redux/reducers/cartReducer";

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
export const ThemeModeContext = React.createContext<ChangeThemeFunction | null>(
  null
);

const App = () => {
  // Localstorage cart 
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cartItems.length > 0) {
      saveToLocalStorage(cartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    const items = loadFromLocalStorage();
    if (items) {
      dispatch(updateCart(items));
    }
  }, []);

  // Theme change
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
              main: "#C19B9B",
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
            secondary: {
              main: "#ccb4b4",
            },
            background: {
              default: "#282828",
            },
            text: {
              primary: "#fcfafa",
              secondary: "#282828",
            },
          },
  });

  return (
    <>
      <ThemeModeContext.Provider value={changeMode}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </>
  );
};

export default App;
