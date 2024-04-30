import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./pages/PrivateRoute.jsx";

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
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
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
