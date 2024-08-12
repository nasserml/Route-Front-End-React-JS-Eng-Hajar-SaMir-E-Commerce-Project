import React, { useEffect, useState } from 'react'
import { getCategories } from '../APIS/getCategories';
import Slider from 'react-slick/lib/slider';

export default function Categories() {

  let [categoriesArr, setCategoriesArr] = useState([]);
  let [loading, setLoading] = useState(false);
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


    
  },[])



  return (
    <div className='my-5 overflow-hidden hidden md:block'> 
      <Slider {...settings}>
        {categoriesArr.map(ele=><img className='h-36 object-cover' key={ele?._id}  src={ele?.image} ></img>)}
      </Slider>
    </div>
  )
}
