import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Forms/LoginForm";
import SignUp from "./Forms/SignUp";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Products";
import AuthNav from "./Components/AuthNav";
import Protected from "./Auth/ProtectedRoute";
import { AuthProvider } from "./Context/Authcontext";
import AuthFoot from "./Components/AuthFoot";
// import { useEffect } from "react";
// import { useAuth } from "./Context/Authcontext";


function App() {
  // const { login } = useAuth();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     login(); 
  //   }

  // }, []); 


  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <>
            <Home />
          </>
        </Protected>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <AuthNav />
          <LoginForm />
          <AuthFoot/>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <AuthNav />
          <SignUp />
          <AuthFoot/>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <Protected>
          <>
            <About />
          </>
        </Protected>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Protected>
            <Contact />
          </Protected>
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <Product>
        <>
          <Product />
        </>
        </Product>
      ),
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
