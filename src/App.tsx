import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { routes } from "./utils/routeUtils";
import "./styles/styles.scss";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";
import useAppSelector from "./redux/hooks/useAppSelectors";
import useAppDispatch from "./redux/hooks/useAppDispatch";
import { updateCart } from "./redux/reducers/cartReducer";

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
          <RouterProvider router={routes}></RouterProvider>
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </>
  );
};

export default App;
