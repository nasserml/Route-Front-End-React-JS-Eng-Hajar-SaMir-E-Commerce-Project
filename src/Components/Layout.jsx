import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer/Footer';

export default function Layout() {
  return (
    <div className=''>
      <Navbar></Navbar>
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}
