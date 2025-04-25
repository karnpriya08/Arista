import React, { useEffect } from 'react';
import Slider from "react-slick";
import ProductCard from '../ProductCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import Error from '../../pages/Error';
import { getAllProducts } from '../../redux/action/productAction';

const index = () => {
  const dispatch = useDispatch();
  // getting all products
  const { loading, error, products = [] } = useSelector((state) => state.allProducts || {});

  // limiting products for slider
  const limitedProducts = products.slice(5, 10);

  // triggers a redux action making api call and storing data 
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  // slider setting
  var settings = {
    infinite: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'ondemand',
    adaptiveHeight: true,
    adaptiveWidth: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
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
      {/* for loading   */}
      {loading ? (<Loading />) :
        // handle error
        error ? (<Error />) : (
          // image slider 
          <Slider {...settings} className='p-6 md:mx-25 h-1/2'>
            {/* maping on products to display  */}
            {limitedProducts.map((product) => (
              <div key={product.id} className='p-4'>
                <ProductCard product={product} className='h-1/6' />
              </div>
            ))}
          </Slider>
        )}
    </>
  )
}
export default index
