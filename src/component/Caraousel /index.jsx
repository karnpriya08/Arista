import React from 'react';
import Slider from "react-slick";
import Image1 from '../../assets/images/imageC5.webp';
import Image2 from "../../assets/images/c4.webp";
import Image3 from "../../assets/images/c6.avif";
import Image4 from "../../assets/images/c5.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const index = () => {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        lazyLoad: 'ondemand',
        adaptiveHeight: true,
        adaptiveWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
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
            settings: "unslick" // destroys slick
      
          }]
      };
  return (
    <>
        <Slider {...settings}>
      <div className='w-full h-full'>
        <img src={Image1}  alt='image' />
      </div>
      <div className='w-1/2 m-2 '>
      <img src={Image2}  alt='image' />
      </div>
      <div>
      <img src={Image3}  alt='image' />
      </div>
      <div className='px-30  '>
      <img src={Image4}  alt='image' />
      </div>
    </Slider>
    </>
  )
}
export default index