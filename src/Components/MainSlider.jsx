import React from 'react'
import mainImg from '../assets/finalProject assets/images/slider-image-1.jpeg';
import img1 from '../assets/finalProject assets/images/slider-image-2.jpeg';
import img2 from '../assets/finalProject assets/images/slider-image-3.jpeg';
import Slider from 'react-slick/lib/slider';

export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
    };

  return (
    <div className='row my-5'>
        <div className="w-2/3">
            <Slider {...settings}>
                <img src={mainImg} className='w-full h-[400px]' alt="" />
                <img src={mainImg} className='w-full h-[400px]' alt="" />
                <img src={mainImg} className='w-full h-[400px]' alt="" />
            </Slider>
            
        </div>
        <div className='w-1/3'>
            <img src={img1} className='w-full h-[200px]' alt="" />
            <img src={img2} className='w-full h-[200px]' alt="" />

        </div>

    </div>
  )
}
