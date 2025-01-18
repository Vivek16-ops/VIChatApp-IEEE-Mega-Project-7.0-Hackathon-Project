import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Forgotpsw from './pages/Forgotpsw.jsx';
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SocketContextProvider><AuthContextProvider><div className='p-4 h-screen flex items-center justify-center'><App /></div></AuthContextProvider></SocketContextProvider>
  },
  {
    path: "/pages/Login",
    element: <SocketContextProvider><AuthContextProvider><div className='p-4 h-screen flex items-center justify-center'><Login /></div></AuthContextProvider></SocketContextProvider>
  },
  {
    path: "/pages/Signup",
    element: <SocketContextProvider><AuthContextProvider><div className='p-4 h-screen flex items-center justify-center'><Signup /></div></AuthContextProvider></SocketContextProvider>
  },
  {
    path: "/pages/Home",
    element: <SocketContextProvider><AuthContextProvider><div className='p-4 h-screen flex items-center justify-center'><Home /></div></AuthContextProvider></SocketContextProvider>
  },
  {
    path: "/pages/Forgotpsw",
    element: <SocketContextProvider><AuthContextProvider><div className='p-4 h-screen flex items-center justify-center'><Forgotpsw /></div></AuthContextProvider></SocketContextProvider>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  </AuthContextProvider>,
)
