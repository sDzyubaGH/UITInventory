import Home from "./pages/Home";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Info from "./pages/Info";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import ErrorPage from "./pages/ErrorPage";
import GuestLayout from "./pages/GuestLayout";
import LoginSingup from "./pages/LoginSingup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/info/home" />,
      },
      {
        path: "/info",
        element: <Info />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/archive",
            element: <Archive />,
          },
          {
            path: "/add",
            element: <AddProduct />,
          },
          {
            path: "/delete",
            element: <DeleteProduct />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <LoginSingup />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
