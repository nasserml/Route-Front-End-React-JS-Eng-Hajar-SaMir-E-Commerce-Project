import React, { useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars/RatingStars";
import { useMutation } from "@tanstack/react-query";
import { addToCartApi } from "../APIS/cartApi";
import useMutationCart from "../Hooks/useMutationCart";
import { toast } from "react-toastify";

export default function Item({ ele }) {

  let [flag, setFlag] = useState(false);


  let {mutate:addMutate, status, data} = useMutationCart('addtocart',addToCartApi);

  

  if(status == 'success') toast.success(data?.data?.message);

  if(status == 'error') console.log('error');





  return (
    <div className="bg-white mx-auto shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 duration-300 transition-all hover:bg-green-50  overflow-hidden hover:shadow-lg hover:scale-105">
      <div className="">
        
        <Link to={`/productdetails/${ele?._id}`}>
          <div >
            <img
              className="rounded-lg  "
              src={ele?.imageCover}
              alt="product image"
            />
          </div>
          <div className="px-3 ">
            <div>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight line-clamp-1 dark:text-white">
                {ele?.title}
              </h3>
              <p className="text-green-700 line-clamp-1 text-sm font-medium">
                {" "}
                {ele?.category?.name}
              </p>
              <p className="line-clamp-2 my-2">{ele?.description}</p>
            </div>
          </div>
        </Link>

        <RatingStars rating={ele?.ratingsAverage}></RatingStars>
        <i onClick={() => setFlag(!flag)} className={`text-green-700 fa-solid ${flag?'fa-heart text-red-500':'fa-heart-broken' }`}></i>

        <div className="flex items-center justify-between px-3 pb-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${ele?.price}
          </span>
          <button
            onClick={()=> addMutate(ele?._id)}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* <div className="product overflow-hidden cursor-pointer p-3 shadow-md rounded-lg hover:border-green-400 hover:border">

            <Link to={'/productdetails'}>
           

                <img src={ele?.imageCover} className='w-full ' alt={ele?.title} />
                <p className='text-green-700 line-clamp-1'> {ele?.category?.name}</p>
                <p className='line-clamp-1'>{ele?.title}</p>
                <div className='flex justify-between my-3'>
                    <p>{ele?.price} EGP</p>
                    <p><i className='fas fa-star text-yellow-500'></i> {ele?.ratingsAverage} EGP</p>
                </div>

            </Link>
            <button className='btn bg-green-700 text-white  rounded'><span className='p-2 inline-block'>Add to Cart</span></button>

        </div> */}
    </div>
  );
}
