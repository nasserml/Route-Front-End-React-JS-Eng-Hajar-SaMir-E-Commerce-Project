import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <Outlet></Outlet>

      </div>
    </div>
  )
}
