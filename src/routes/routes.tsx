import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDetail";
import ErrorPage from "../pages/errors/ErrorPage";
import MainLayout from "../components/layouts/MainLayout";
import GuestOnly from "./guestOnly";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestOnly>
        <Login />
      </GuestOnly>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestOnly>
        <Register />
      </GuestOnly>
    ),
  },
  {
    path: "/post/detail/:id",
    element: (
      <MainLayout>
        <PostDetail />
      </MainLayout>
    ),
  },
]);

export default router;
