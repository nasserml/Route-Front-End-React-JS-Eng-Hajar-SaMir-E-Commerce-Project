import React, { useEffect, useState } from 'react'
import FeaturedProducts from './FeaturedProducts';
import { getCategories } from '../APIS/getCategories';
import { getProductsWithCategories } from '../APIS/getProducts';
import { NavLink } from 'react-router-dom';

export default function Products() {

  let [categoriesArr, setCategoriesArr] = useState([]);
  let [loading, setLoading] = useState(false);
  let [arr, setArr] = useState([]);
  let [msg, setMsg] = useState('');


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    autoplay:true,
    autoplaySpeed: 1500,
  };


  async function getCAtegoriesApi() {

    setLoading(true);
    let data = await getCategories();
    if(data?.data) {
      setCategoriesArr(data?.data);
      setMsg('');
      setLoading(false);


    }else {
      setMsg(data);
      setLoading(false);

    }


  }

  useEffect(()=>{
    getCAtegoriesApi();


    
  },[]);

  async function getData(id){
    let data = await getProductsWithCategories(id);
    setArr(data?.data)
  }

  return (
    <div className='flex gap-3'>
      <ul className='my-9 '>
        {categoriesArr.map(ele=><li key={ele?._id} onClick={()=> getData(ele?._id)} className=' hover:text-white transition-all px-1 py-2 hover:bg-sky-500 hover bg-sky-200 text-center rounded-lg  my-2 duration-500 cursor-pointer hover:underline '>{ele?.name}</li>)}
      </ul>
      <FeaturedProducts arr={arr} ></FeaturedProducts>
    </div>
  )
}
