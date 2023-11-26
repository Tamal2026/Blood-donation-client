import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayOut from "./Layout/MainLayOut";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ContactUs from "./Pages/ContactUS/ContactUs";
import AuthProvider from "./Components/Provider/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./Components/Dashboard/Dashboard";
import Statictics from "./Components/Dashboard/Statics/Statictics";
import AllUsers from "./Components/Dashboard/AllUsers/AllUsers";
import ContentManageMent from "./Components/Dashboard/ContentManagement/ContentManageMent";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contactus",
        element: <ContactUs></ContactUs>,
      },
    ],
    
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'statictics',
        element:<Statictics></Statictics>
      },{
        path:'allusers',
        element:<AllUsers></AllUsers>
      },{
        path:'content',
        element:<ContentManageMent></ContentManageMent>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
