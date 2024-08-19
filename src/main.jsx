import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./public/pages/home/Home.jsx";
import Login from "./public/pages/login/Login.jsx";
import Signup from "./public/pages/signup/Signup.jsx";
import DroneSimulationWithKeys from "./components/DroneSimulationWithKeys.jsx";
import DroneSimulationWithJoystick from "./components/DroneSimulationWithJoystick.jsx";
// import DroneSimulationWithGestures from "./components/DroneSimulationWithKeys.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDataProvider from "./lib/context/UserDataProvider.jsx";
import DroneSimulationWithGestures from "./components/DroneSimulationWithGestures.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/keyscontrol",
    element: <DroneSimulationWithKeys />,
  },
  {
    path: "/joystickcontrol",
    element: <DroneSimulationWithJoystick />,
  },
  {
    path: "/gesturescontrol",
    element: <DroneSimulationWithGestures />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserDataProvider>
      <RouterProvider router={router} />
    </UserDataProvider>
  </React.StrictMode>
);
