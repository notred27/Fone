import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './__util__/reportWebVitals.js';
// import App from './App.js'
import PageNotFound from './pages/Error/PageNotFound.js';
import './index.css';
import Login from './pages/Login/Login.js'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home.js';
import Chatroom from './pages/Chatroom/Chatroom.js';

export const CHATROOM_THEMES = {
  "imessage": "imessage",
  "sms": "sms",
  "gmessage": "gmessage",
  "whatsapp": "whatsapp",
}

// TODO: simplify login
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <PageNotFound />,      
  },

  // {
  //   path: "/login",
  //   element: <Login />,
  //   errorElement: <PageNotFound />,    

  // },

  {
    path: "/home",
    element: <Home />,
    errorElement: <PageNotFound />,    
  },

  {
    path: "/chatroom/:chatroomId",
    element: <Chatroom />,
    errorElement: <PageNotFound />,    
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
