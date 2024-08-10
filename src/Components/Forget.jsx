import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';


const useAuthAPI = () => {
  const forgetPassword = async (values) => {
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
    return response.data;
  };

  return {forgetPassword}
}

export default function Forget() {

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('');

  const {forgetPassword} = useAuthAPI();



  const validationSchema = Yup.object({
    email: Yup.string().email().required('email is required'),
   
  })

  async function handleForget(values) {
      
      try {
        setLoading(true);
        setMsg('');

        const data = await forgetPassword(values);

        setLoading(false);

        if(data.statusMsg==='success'){
            navigate('/reset')
        }
    } catch (error) {

        setMsg(err?.response?.data?.message || 'An error occurred');
        setLoading(false)
        
    }
    
  }


  let formik = useFormik({
    initialValues: {
    
      email:'',
      
    },
    // validate:validation,
    validationSchema,
    onSubmit: handleForget

  })

  return (
    <div>
      <h2 className='my-3 text-2xl font-bold'>Forget Password:</h2>
      

      {msg?<div className="w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"  role="alert">
            <span className="font-medium">{msg}</span>
          </div>:''}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
     

    

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email"  id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>

        {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div>: null}



     
    


        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{loading ?<i className='fas fa-spinner fa-spin text-white'></i>: 'Submit' }</button>
      </form>

      <p className='text-center'>Don't have account <Link to='/register' className='text-green-700 font-bold underline'>Register</Link></p>
      
    </div>
  )
}
