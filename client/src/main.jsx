import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { store, persistor } from "./redux/store.js";
import PrivateRoute from "./pages/PrivateRoute.jsx";
import OnlyAdminPrivateRoute from "./pages/OnlyAdminPrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import AllPosts from "./pages/AllPosts.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import Search from "./pages/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/post/:postSlug",
    element: <PostPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-post",
    element: (
      <OnlyAdminPrivateRoute>
        <CreatePost />
      </OnlyAdminPrivateRoute>
    ),
  },
  {
    path: "/update-post/:postId",
    element: (
      <OnlyAdminPrivateRoute>
        <UpdatePost />
      </OnlyAdminPrivateRoute>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </PersistGate>
);
