import React, { useEffect, useState } from "react";
import { getSpecificProduct } from "../APIS/getSpecificProducts";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import RatingStars from "./RatingStars/RatingStars";
import Loading from "./Loading";
import ProductImageSlider from "./ProductImageSlider/ProductImageSlider";
import { getProductsWithCategories } from "../APIS/getProducts";
import Item from "./Item";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useMutation } from "@tanstack/react-query";
import { addToCartApi } from "../APIS/cartApi";
import { toast } from "react-toastify";
import useMutationCart from "../Hooks/useMutationCart";

export default function ProductsDetails() {

    
    let {mutate:addMutate, status, data} = useMutationCart('addtocart',addToCartApi);

  

    if(status == 'success') toast.success(data?.data?.message);

    if(status == 'error') console.log('error');



    let [imgSrc, setImage] = useState("");
    let [product, setProduct] = useState([]);
    let [relatedPRoducts, setRelatedProducts] = useState([]);
    let [loading, setLoading] = useState(false);
    let [msg, setMsg] = useState("");
    let { id } = useParams();

    async function getSpecificProductApi() {
        setLoading(true);
        let data = await getSpecificProduct(id);
        if (data?.data) {
            setProduct(data?.data);
            setMsg("");
            setLoading(false);
        } else {
            setMsg(data);
            setLoading(false);
        }
    }

    // related Products
    async function getProductsWithCategoriesApi(categoryId) {
        let data = await getProductsWithCategories(categoryId);
        if (data?.data) {
            setRelatedProducts(data?.data);
            setMsg("");
        } else {
            setMsg(data);
        }
    }

    useEffect(() => {
        if (product?.category?._id)
            getProductsWithCategoriesApi(product?.category?._id);
    }, [product]);

    useEffect(() => {
        getSpecificProductApi();
    }, [id]);

    function changeSrc(e) {
        setImage(e.target.src);
    }

    if (loading) return <Loading></Loading>;

    if (msg) return <h2 className="text-red-700 my-2 font-bold">{msg}</h2>;

    return (
        <>
            <div className="bg-white">
                {/* <div  className="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
                <button  className="text-gray-600 focus:outline-none">
                    <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <hr className="my-3"/>
            <div className="flex justify-between mt-6">
                <div className="flex">
                    <img className="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="" />
                    <div className="mx-3">
                        <h3 className="text-sm text-gray-600">Mac Book Pro</h3>
                        <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <span className="text-gray-600">20$</span>
            </div>
            <div className="flex justify-between mt-6">
                <div className="flex">
                    <img className="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="" />
                    <div className="mx-3">
                        <h3 className="text-sm text-gray-600">Mac Book Pro</h3>
                        <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <span className="text-gray-600">20$</span>
            </div>
            <div className="flex justify-between mt-6">
                <div className="flex">
                    <img className="h-20 w-20 object-cover rounded" src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="" />
                    <div className="mx-3">
                        <h3 className="text-sm text-gray-600">Mac Book Pro</h3>
                        <div className="flex items-center mt-2">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span className="text-gray-700 mx-2">2</span>
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <span className="text-gray-600">20$</span>
            </div>
            <div className="mt-8">
                <form className="flex items-center justify-center">
                    <input className="form-input w-48" type="text" placeholder="Add promocode" />
                    <button className="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Apply</span>
                    </button>
                </form>
            </div>
            <a className="flex items-center justify-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                <span>Chechout</span>
                <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
        </div> */}
                <main className="my-8">
                    <div className="container mx-auto px-6">
                        <div className="md:flex md:items-center">
                            <div className="w-full  md:w-3/12 ">
                                <ProductImageSlider
                                    images={product?.images}
                                ></ProductImageSlider>
                            </div>
                            <div className="w-full max-w-lg mx-auto mt-5 md:ml-3 md:mt-0 md:w-9/12">
                                <h3 className="text-gray-700 uppercase text-lg">
                                    {product?.title}
                                </h3>
                                <span className="text-gray-500 mt-3">${product?.price}</span>
                                <hr className="my-3" />
                                {/* <div className="mt-2">
                            <label className="text-gray-700 text-sm" for="count">Count:</label>
                            <div className="flex items-center mt-1">
                                <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                    <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                                <span className="text-gray-700 text-lg mx-2">20</span>
                                <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                                    <svg className="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                            </div>
                        </div> */}
                                <div className="mt-3">
                                    <label className="text-gray-700 text-sm" for="count">
                                        Rating:
                                    </label>
                                    <RatingStars
                                        rating={product?.ratingsAverage ?? 0}
                                    ></RatingStars>
                                </div>
                                <hr className="my-3" />
                                <div className="mt-3">
                                    <label className="text-gray-700 text-sm" for="count">
                                        Description:
                                    </label>
                                    <h3>{product?.description}</h3>
                                </div>
                                <hr className="my-3" />
                                <div className="mt-3">
                                    <label className="text-gray-700 text-sm" htmlFor="count">
                                        Category:
                                    </label>
                                    <h3>{product?.category?.name}</h3>
                                </div>
                                <hr className="my-3" />
                                <div className="mt-3">
                                    <label className="text-gray-700 text-sm" htmlFor="count">
                                        Subcategory:
                                    </label>
                                    <h3>{product?.subcategory?.[0]?.name}</h3>
                                </div>
                                <hr className="my-3" />
                                <div className="mt-3">
                                    <label className="text-gray-700 text-sm" htmlFor="count">
                                        brand:
                                    </label>
                                    <h3>{product?.brand?.name}</h3>
                                </div>
                                <hr className="my-3" />
                                <div className="flex items-center mt-6">
                                    <button className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
                                        Order Now
                                    </button>
                                    <button onClick={()=> addMutate(product._id)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <RelatedProducts products={relatedPRoducts}></RelatedProducts>
                    </div>
                </main>

                {/* <h2> Related Products</h2>
        <div className="grid grid-cols-6">
            {relatedPRoducts?.map(prod=> <Item  ele={prod} key={prod?._id}></Item>)}

        </div> */}
            </div>
        </>
    );
}

{
    /* 
  // <div className="row items-center">
      //   <div className="w-1/3 py-5 rounded-lg overflow-hidden">
      //     <img src={imgSrc? imgSrc: product?.imageCover} className="w-full inline-block rounded-lg" alt="" />
  
      //     <ul className="flex justify-center my-3" >
      //       {product?.images?.map(img=><li key={img}><motion.img  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={changeSrc} src={img} className="w-20 cursor-pointer rounded-md" alt="" /></li>)}
      //     </ul>
      //   </div>
  
      //   <div className="w-2/3">
      //   <div className="px-3 ">
      //         <a href="#">
      //           <h3 className="text-gray-900 font-semibold text-xl tracking-tight  dark:text-white">
      //             {product?.title}
      //           </h3>
      //           <p className="text-green-700 text-sm font-medium">
      //             {" "}
      //             {product?.category?.name}
      //           </p>
      //           <p className=" my-2">{product?.description}</p>
      //         </a>
      //       </div>
  
      //       <RatingStars rating={product?.ratingsAverage}></RatingStars>
  
  
      //     <div className="flex items-center justify-between flex-row-reverse px-3 pb-3 pt-4">
      //       <span className="text-3xl font-bold text-gray-900 dark:text-white">
      //         ${product?.price}
      //       </span>
      //       <button
              
      //         className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      //       >
      //         Add to cart
      //       </button>
      //     </div>
      //   </div>
  
      // </div>
  */
}
