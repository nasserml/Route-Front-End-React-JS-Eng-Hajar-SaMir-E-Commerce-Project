import React, { useContext, useState } from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'

export default function Navbar() {

  let navigate = useNavigate();

  let {setLogin, isLogin} = useContext(auth);

  let [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open);
  }

  function logOut(){
    localStorage.removeItem('userToken');
    setLogin(null)
    navigate('/login');
  }


  return (
    <nav className='py-4 bg-main-light'>
      <div className="container md:flex justify-between items-center relative">

        <div className='md:flex gap-2'>
          <img width={130} src={logo} alt="" />

          {isLogin && <ul className={`  md:flex gap-4 ${open ? 'block' : 'hidden'}`}>


                          <li>
                            <NavLink to={'/'}>Home</NavLink>
                          </li>


                          <li>
                            <NavLink to={'/products'}>Products</NavLink>
                          </li>


                          <li>
                            <NavLink to={'/cart'}>Cart</NavLink>
                          </li>


                          <li>
                            <NavLink to={'/brand'}>Brand</NavLink>
                          </li>






                          </ul> }
          

        </div>

        <div>

          <ul className={`md:flex gap-2 ${open ? 'block': 'hidden'}`}>

            

            

            {isLogin? <>
            <li onClick={logOut} className='cursor-pointer px-3 py-2 bg-red-400 hover:bg-red-600 text-white transition-colors duration-200 max-md:w-fit max-md:my-3'>LogOut </li>{isLogin? <b className='text-green-700 ps-1 py-2'>Hi {isLogin.name}</b>: ''}</>  : <>
            <li>
              <NavLink to={'/login'}>Login</NavLink>
              
            </li>

            <li>
              <NavLink to={'/register'}>Register</NavLink>

            </li>
            <li className='flex gap-4'>
            <a href=""><i className='fab fa-facebook'></i></a>
            <a href=""><i className='fab fa-twitter'></i></a>
            <a href=""><i className='fab fa-google'></i></a>
            <a href=""><i className='fab fa-instagram'></i></a>
          </li></>

            }

          </ul>

        </div>

        <i onClick={toggle} className={`md:hidden block ${!open? 'fa-bars': 'fa-close'} fas  fa02x absolute top-0 right-2 cursor-pointer`}></i>


      </div>
    </nav>
  )
}