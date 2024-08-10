import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Products from './Components/Products';
import Cart from './Components/Cart';
import Categories from './Components/Categories';
import Brand from './Components/Brand';
import NotFound from './Components/NotFound';
import CounterContextProvider from './Context/CounterContext';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Forget from './Components/Forget';
import ResetCode from './Components/ResetCode';
import NewPassword from './Components/NewPassword';

export default function App() {

  let routes = createBrowserRouter([{
    path: '/' , element:<Layout></Layout>, children: [
      {index:true, element:<ProtectedRoutes><Home></Home></ProtectedRoutes>},
      {path:'/products', element:<ProtectedRoutes><Products></Products></ProtectedRoutes>},
      {path:'/cart', element:<ProtectedRoutes><Cart></Cart></ProtectedRoutes>},
      {path:'/register', element:<Register></Register>},
      {path:'/forget', element:<Forget></Forget>},
      {path:'/newpassword', element:<NewPassword></NewPassword>},
      {path:'/reset', element:<ResetCode></ResetCode>},
      {path:'/login', element:<Login></Login>},
      {path:'/categories', element:<ProtectedRoutes><Categories></Categories></ProtectedRoutes>},
      {path:'/brand', element:<ProtectedRoutes><Brand></Brand></ProtectedRoutes>},
      {path:'*', element: <NotFound></NotFound>},

    ]
  }]);

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}
