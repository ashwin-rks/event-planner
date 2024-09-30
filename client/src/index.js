import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext";
import LoginPage from "./Components/LoginPage";
import ErrorBoundary from "./Components/ErrorBoundary";
import Signup from "./Components/SignupPage";
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Components/Dashboard";
import CreateEvent from "./Components/CreateEvent";
import MyEvents from "./Components/MyEvents";
import EditEvent from "./Components/EditEvent";
import Bookings from "./Components/Bookings";
import AllEvents from "./Components/AllEvents";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <PrivateRoute component={Dashboard} />,
  },
  {
    path: "/create-events",
    element: <PrivateRoute component={CreateEvent} managerOnly={true} />,
  },
  {
    path: "/my-events",
    element: <PrivateRoute component={MyEvents} managerOnly={true} />,
  },
  {
    path: "*",
    element: <ErrorBoundary />,
  },
  {
    path: "/test",
    element: <EditEvent />,
  },
  {
    path: "/bookings",
    element: <Bookings />,
  },
  {
    path: '/sports-events',
    element: <AllEvents />
  },
  {
    path: '/theatre-events',
    element: <AllEvents />
  },
  {
    path: '/music-events',
    element: <AllEvents />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer /> 
  </AuthProvider>
);
