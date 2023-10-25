import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import Cart from "../pages/Cart";
import Modification from "../pages/Modification";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

export const router = createBrowserRouter([
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
export {};

function routeUtils() {
  return (
    <div>routeUtils</div>
  )
}

export default routeUtils