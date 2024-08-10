import { useFormik } from 'formik'
import React, {useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




//  Custome hook for API interaction
const useAuthAPI = () => {
  const verifyResetCode = async (values) => {
    const response = await  axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
    return response.data;
  }

  return {verifyResetCode};
}


export default function ResetCode() {

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [msg, setMsg] = useState('');
  const {verifyResetCode}= useAuthAPI();

  

  async function handleResetCode(values) {
      
      try {
        console.log(values)
        setLoading(true);
        setMsg('');

        const data = await verifyResetCode(values);

        // let{data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
        setLoading(false);
        if(data.status ==='Success') {
            navigate('/newpassword')
        }

    } catch (err) {

        setMsg(err?.response?.data?.message || 'An error occurred');
        setLoading(false)
        
    }
    
  }


  let formik = useFormik({
    initialValues: {
    
        resetCode:'',
      
    },
    // validate:validation,
    onSubmit: handleResetCode

  })

  return (
    <div>
      <h2 className='my-3 text-2xl font-bold'>Reset Password:</h2>
      

      {msg?<div className="w-1/2 mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"  role="alert">
            <span className="font-medium">{msg}</span>
          </div>:''}

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
     

    

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text"  id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ResetCode</label>
        </div>




     
    


        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{loading ?<i className='fas fa-spinner fa-spin text-white'></i>: 'Submit' }</button>
      </form>

      <p className='text-center'>Don't have account <Link to='/register' className='text-green-700 font-bold underline'>Register</Link></p>
      
    </div>
  )
}
