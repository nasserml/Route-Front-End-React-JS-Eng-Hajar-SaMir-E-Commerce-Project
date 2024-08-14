import React, { useEffect, useState } from "react";
import useMutationCart from "../../Hooks/useMutationCart";
import { deleteCartApi, updateCartApi } from "../../APIS/cartApi";
import { toast } from "react-toastify";

export default function CartProduct({ product }) {

    const [productCount, setProductCount] = useState(product?.count);

    let { mutate: delmutate, status: deleteStatus, data: deldata } = useMutationCart(
        "deletcart",
        deleteCartApi
    );
    let { mutate: updatemutate, status: updateStatus, isPending:isUpdateCartPending  , isSuccess:isUpdateCartSuccess, data:updatedData} = useMutationCart(
        "updatecart",
        updateCartApi
    );

    if (deleteStatus === "success") toast.success("Item deleted successfully");

    if (updateStatus == "success") console.log("Item updated successfully");

    if(isUpdateCartSuccess) console.log("Item updated cart successfully");
   
    useEffect(()=>{
        setProductCount(product?.count);
    },[product])

    function decreaseitem(id, count){
        count--;

        if(count == 0 ) {
            delmutate(id);
            return true;
        }

        updatemutate({id, count});
    }

    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
                src={product?.product?.imageCover}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                        {product?.product?.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">${product?.price}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button disabled={product?.count == 1||isUpdateCartPending}
                            onClick={() =>
                                decreaseitem(product?.product?._id, product?.count)
                            }
                            className="cursor-pointer rounded-l bg-gray-100 disabled:hover:bg-gray-100 disabled:hover:text-black py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-green- disabled:cursor-not-allowed"
                        >
                            {" "}
                            {isUpdateCartPending?<i className="fa fa-spinner fa-spin"></i>:'-'}
                            {" "}
                        </button>
                        <input
                            
                            onBlur={() => product?.count != productCount && updatemutate({id:product?.product?._id, count: productCount})}
                            onChange={(e) => setProductCount(e.target.value)}
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={productCount}
                            min="1"
                        />
                        <button disabled={isUpdateCartPending} onClick={() =>
                        updatemutate({
                            id: product?.product?._id,
                            count: product?.count +1,
                                    })
                               
                            } className="cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-green-50">
                            {" "}
                            {isUpdateCartPending? <i className="fa fa-spinner fa-spin"></i>:'+'} 
                            {" "}
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${product?.price * product?.count}</p>
                        <svg
                            onClick={() => delmutate(product?.product?._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
