import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';



const saveToken= (token) => {
  localStorage.setItem('userToken',token );
}

const decodeToken = (token) => jwtDecode(token);

const handleError = (error, setMsg, setLoading) => {
  setLoading(false);
  setMsg(error?.response?.data?.message || 'Registration failed');
}

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'min length is 2 char').max(10, 'max length is 10 char').required('name is required'),
  email: Yup.string().email().required('email is required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password password must start with capital letter and have 6-10 characters').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')], 'password does not match').required('rePassword is required'),
  phone: Yup.string().matches(/^01[0-25][0-9]{8}$/, 'invalid phone number phone must start with 01 and have 11 numbers').required('phone is required'),
});


export default function Register() {

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('');
  let {setLogin} = useContext(auth)

   

  function handleRegister(values) {
    setLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({data})=> {
    console.log(data)
    if(data.message === 'success') {
      setMsg('');
      setLoading(false);
      localStorage.setItem('userToken', data.token);
      setLogin(jwtDecode(data.token));
      navigate('/')
    }

    }).catch((err) => {
      setLoading(false);
      setMsg( err?.response?.data?.message);
    })
  }

  // function validation(values) {

  //   let errors =  {}
  //   if(!values.name) 
  //     errors.name = 'name is required';
  //   else if(!/^[A-Z][a-z]{3,5}$/.test(values.name))
  //     errors.name = 'name must start with capital and have 3 to 5 characters';

  //   if(!values.email) 
  //     errors.email = 'email is required';
  //   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
  //     errors.email = 'invalid email address';


  //   if(!values.password)
  //     errors.password = 'password is required';
  //   else if(values.password.length < 8)
  //     errors.password = 'password must be at least 8 characters';

  //   if(!values.rePassword )
  //     errors.rePassword = 'rePassword is required';
  //   else if(values.rePassword !== values.password)
  //     errors.rePassword = 'passwords do not match';

  //   if(!values.phone)
  //     errors.phone = 'phone is required';
  //   else if(!/^[0-9]{10}$/.test(values.phone))
  //     errors.phone = 'invalid phone number';

  //     return errors;
  // }

  let formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone: ''
    },
    // validate:validation,
    validationSchema,
    onSubmit: handleRegister

  })

  return (
    <div>
      <h2 className='my-3 text-2xl font-bold'>Register Now:</h2>
      

      {msg?<div className="w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"  role="alert">
            <span className="font-medium">{msg}</span>
          </div>:''}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur}  value={formik.values.name} type="text"  id="name" onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>

          {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div>: null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email"  id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>

        {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div>: null}



        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password"  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert"><span className="font-medium">{formik.errors.password}</span>
        </div>: null}

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password"  id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>

        {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert"><span className="font-medium">{formik.errors.rePassword}</span>
        </div>: null}



        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} value={formik.values.phone} type="tel"  id="phone" onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
        </div>

        {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert"><span className="font-medium">{formik.errors.phone}</span>
        </div>: null}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{loading ?<i className='fas fa-spinner fa-spin text-white'></i>: 'Register' }</button>
      </form>

      <p className='text-center'>Already hava an acoount <Link to='/login' className=' text-green-700 font-bold'>Login</Link></p>

    </div>
  )
}
