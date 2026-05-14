import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDetail";
import ErrorPage from "../pages/errors/ErrorPage";
import MainLayout from "../components/layouts/MainLayout";
import GuestOnly from "./guestOnly";
import AuthOnly from "./authOnly";
import Profile from "../pages/profiles/Profile";
import UserProfile from "../pages/profiles/UserProfile";
import LikeProvider from "../providers/LikeProvider";
import FavProvider from "../providers/FavProvider";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <MainLayout>
        <LikeProvider>
          <FavProvider>
            <Home />
          </FavProvider>
        </LikeProvider>
      </MainLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <AuthOnly>
        <MainLayout>
          <LikeProvider>
            <FavProvider>
              <UserProfile />
            </FavProvider>
          </LikeProvider>
        </MainLayout>
      </AuthOnly>
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
        <LikeProvider>
          <FavProvider>
            <PostDetail />
          </FavProvider>
        </LikeProvider>
      </MainLayout>
    ),
  },
]);

export default router;
