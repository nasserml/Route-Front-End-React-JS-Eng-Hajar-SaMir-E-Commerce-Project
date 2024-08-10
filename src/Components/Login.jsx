import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';


const useAuthAPI = () => {
  const loginUser = async (values) => {
    const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
    return response.data;
  }

  return {loginUser};
}


const useLoginHandler =  () => {
  const {setLogin} = useContext(auth);
  const navigate = useNavigate();
  const {loginUser} = useAuthAPI();

  const handleLogin = async (values, setLoading, setMsg) => {
   try {

    setLoading(true);
    const data = await loginUser(values);
    if(data.message === 'success') {
      setMsg('');
      localStorage.setItem('userToken', data.token);
      setLogin(jwtDecode(data.token));
      navigate('/')
    }
    
   } catch (error) {

      setMsg(error?.response?.data?.message || 'An error occurred');
    
   } finally {
      setLoading(false);
   }
  }

  return {handleLogin};
};




const validationSchema = Yup.object({
  email: Yup.string().email().required('email is required'),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'invalid password password must start with capital letter and have 6-10 characters').required('password is required'),
 
})


export default function Login() {

  // let {setLogin} = useContext(auth);
  // let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('');
  const {handleLogin} = useLoginHandler();



  // function handleLogin(values) {
  //   setLoading(true);
  //   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({data})=> {
  //   console.log(data)
  //   if(data.message === 'success') {
  //     setMsg('');
  //     setLoading(false);
  //     localStorage.setItem('userToken', data.token);
  //     setLogin(jwtDecode(data.token))
  //     navigate('/')
  //   }

  //   }).catch((err) => {
  //     setLoading(false);
  //     setMsg( err?.response?.data?.message);
  //   })
  // }


  let formik = useFormik({
    initialValues: {
    
      email:'',
      password:'',
      
    },
    // validate:validation,
    validationSchema,
    onSubmit: (values) => handleLogin(values, setLoading, setMsg),

  })

  return (
    <div>
      <h2 className='my-3 text-2xl font-bold'>Login Now:</h2>
      

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



        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password"  id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert"><span className="font-medium">{formik.errors.password}</span>
        </div>: null}

    


        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{loading ?<i className='fas fa-spinner fa-spin text-white'></i>: 'Login' }</button>
      </form>

      <p className='text-center'>Don't have account <Link to='/register' className='text-green-700 font-bold underline'>Register</Link></p>
      <p className='text-center'>Don't have account <Link to='/forget' className='text-green-700 font-bold underline'>Forget Password</Link></p>
    </div>
  )
}
