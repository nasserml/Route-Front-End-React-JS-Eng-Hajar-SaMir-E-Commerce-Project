import React, { useState } from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../APIS/cartApi'

import Loading from './Loading'
import useMutationCart from '../Hooks/useMutationCart';
import { toast } from 'react-toastify';
import CartProduct from './CartProduct/CartProduct';
import BasicModal from './BasicModal';

export default function Cart() {

    const [loadin, loading] = useState(true);

  let {isError, error, data, isLoading, isFetching} = useQueryCart('getcart', getCartApi);

  let {mutate:clearmuutate , status: clearStatus} = useMutationCart('clearcart', clearCartApi);

  console.log(data)
  if(clearStatus == 'success') {
    console.log('cleared')
  }



  if(isLoading) return <Loading></Loading>


  if(isError) return <h1 className='text-2xl mx-auto block my-8'>Cart is empty</h1>

  return (
    <>


    <div className=" pt-20">
       
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">

            {data?.data?.products.map((product, index)=>{
                return <CartProduct key={product?._id} product={product}></CartProduct>
                // return <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                // <img src={product?.product?.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
                // <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                //     <div className="mt-5 sm:mt-0">
                //     <h2 className="text-lg font-bold text-gray-900">{product?.product?.title}</h2>
                //     <p className="mt-1 text-xs text-gray-700">${product?.price}</p>
                //     </div>
                //     <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                //     <div className="flex items-center border-gray-100">
                //         <span onClick={()=> updatemutate({id:product?.product?._id, count:product?.count-1})} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green-50"> - </span>
                //         <input onClick={()=> updatemutate({id:product?.product?._id, count:product?.count+1})} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product?.count} min="1" />
                //         <span  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-green-50"> + </span>
                //     </div>
                //     <div className="flex items-center space-x-4">
                //         <p className="text-sm">${product?.price * product?.count}</p>
                //         <svg onClick={()=> delmutate(product?.product?._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                //         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                //         </svg>
                //     </div>
                //     </div>
                // </div>
                // </div>
            } )}
            
        </div>
        
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">{data?.data?.totalCartPrice}</p>
            </div>
            <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0.00</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
                <p className="mb-1 text-lg font-bold">${data?.data?.totalCartPrice} USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
            </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-green-50 hover:bg-green-600">Check out</button>
        </div>
        </div>
    </div>

        <button onClick={()=> clearmuutate()} className='text-red-500 border-2 border-red-500 rounded-lg py-2 px-4 transition-colors duration-500 hover:bg-red-500 hover:text-white mx-auto mb-4 block'>Clear Cart</button>

        <div className='flex justify-center items-center mt-5'>
            <BasicModal cartId={data?.data?._id} />
        </div>

    

        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action <i className="fa-solid fa-trash text-red-700 "></i>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {data?.data?.products.map((ele)=> <tr key={ele?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                            <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={ele?.product?.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                           {ele?.product?.title}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-400 ">{ele?.count}</span>
                                </div>
                                <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span className="sr-only">Quantity button</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            ${ele?.price}
                        </td>
                        <td className="px-6 py-4">
                            <button  className="font-medium text-red-600 dark:text-red-500  bg-gray-300 p-2 rounded-lg ">Remove </button>
                        </td>
                    </tr> )}
                    
                   
                </tbody>
            </table>
        </div> */}

    </>
  )
}
