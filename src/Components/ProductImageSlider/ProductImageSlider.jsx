import React from "react";
import Slider from "react-slick";

export default function ProductImageSlider({images}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images?.map((img,index) => (
        <img key={index}
          className=" w-[80%] mx-auto rounded-md object-contain"
          src={img}
         
        />
      ))}
    </Slider>
  );
}
