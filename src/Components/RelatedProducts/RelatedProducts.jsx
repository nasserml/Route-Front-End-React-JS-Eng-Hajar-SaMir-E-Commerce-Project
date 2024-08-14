import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import useMutationCart from "../../Hooks/useMutationCart";
import { toast } from "react-toastify";
import { addToCartApi } from "../../APIS/cartApi";

export default function RelatedProducts({ products }) {

    let {mutate:addMutate, status, data} = useMutationCart('addtocart',addToCartApi);

  

    if(status == 'success') toast.success(data?.data?.message);

    if(status == 'error') console.log('error');

    var settings = {
        dots: false,
        infinite: false,
        speed: 100,
        slidesToShow: 5,
        slidesToScroll: 4,
        arrows: false
    };

    return (
        <div className="mt-16">
            <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>

            <Slider {...settings}>
                {products?.map((product,index) => {
                    return (
                        <div key={index} className="w-full p-2 max-w-sm mx-auto  overflow-hidden">
                            <div className=" shadow-md rounded-md ">
                            <div
                                className="flex items-end justify-end h-56 w-full bg-cover bg-center"
                                style={{ "backgroundImage": `url(${product?.imageCover})` }}
                            >
                                <button onClick={() => addMutate(product?._id)} className="p-2 rounded-full bg-green-600 text-white mx-5 -mb-4 hover:bg-green-500 focus:outline-none">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLineJoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="px-5 py-3">
                                <Link to={'/productdetails/'+product._id }>
                                    <h3 className="text-gray-700 uppercase line-clamp-1">{product?.title}</h3>

                                </Link>
                                <span className="text-gray-500 mt-2">${product?.price}</span>
                            </div>

                            </div>
                            
                        </div>
                    );
                })}

            </Slider>
        </div>
    );
}
