import Home from "./pages/Home";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Info from "./pages/Info";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import ErrorPage from "./pages/ErrorPage";
import GuestLayout from "./pages/GuestLayout";
import LoginSingup from "./pages/LoginSingup";
import DefaultLayout from "./pages/DefaultLayout";
import Archive from "./pages/Archive";
import Registration from "./pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },

      {
        path: "home",
        element: <Home />,
      },
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "delete",
        element: <DeleteProduct />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <LoginSingup />,
      },
      {
        path: "reg",
        element: <Registration />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
