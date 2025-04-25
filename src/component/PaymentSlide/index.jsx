import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image1 from '../../assets/images/p1.png';
import Image2 from "../../assets/images/p2.png";
import Image3 from "../../assets/images/p3.png";
import Image4 from "../../assets/images/p4.png";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    adaptiveHeight: true, 
    autoplay:[{
    autoplay: true,
autoplaySpeed: 2000}],
    responsive: [{

        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          infinite: true
        }
  
      }, {
  
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true
        }
  
      }, {
  
        breakpoint: 300,
        settings: "unslick" 
        // destroys slick 
      }]   
  };
  return (
    <Slider {...settings}>
      <div className='w-1/2 m-2 '>
      <img src={Image1}  alt='image' />
      </div>
      <div className='w-1/2 m-2 '>
      <img src={Image2}  alt='image' />
      </div>
      <div className='w-1/2 m-2 '>
      <img src={Image3}  alt='image' />
      </div>
      <div className='w-1/2 m-2 '>
      <img src={Image4}  alt='image' />
      </div>     
    </Slider>
  );
}