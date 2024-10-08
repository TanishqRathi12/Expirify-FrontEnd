import './App.css';
import React from 'react';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import LoginForm from './Forms/LoginForm';
import SignUp from './Forms/SignUp';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Products';
import AuthNav from './Components/AuthNav';

function App() {
  let router = createBrowserRouter([
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/login',
      element: <><AuthNav/><LoginForm /></>
    },
    {
      path:'/signup',
      element: <><AuthNav/><SignUp /></>
    },
    {
      path:'/about',
      element: <About />
    },
    {
      path:'/contact',
      element: <Contact />
    },
    {
      path:'/products',
      element: <Product />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
