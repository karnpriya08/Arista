import React from 'react';
import Caraousel from '../../component/Caraousel ';
import image from '../../assets/images/refer.jpeg';
import FantasticFinds from '../../component/FantasticFind';
import Services from '../../component/Services';
import PaymentSlide from '../../component/PaymentSlide';
import Care from '../../component/Care';

const index = () => {
  return (
    <>
      <div className='p-6' style={{ paddingTop: '80px' }}>
        <Caraousel />
      </div>

      {/* Refer Section */}
      <div className='bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 p-4 shadow-md relative z-20 m-4 animate-pulse duration-1000 delay-700'>
        <div className='flex flex-col md:flex-row justify-evenly items-center'>
          <img
            src={image}
            alt="refer-image"
            className='p-2 h-32 mt-4 m-1 w-full max-w-xs md:max-w-sm'
          />
          <div className='flex flex-col font-semibold text-white text-center p-5 m-5 gap-2 font-sans'>
            <p>REFER FRIENDS</p>
            <h1 className='text-2xl md:text-4xl'>GET 100 ARISTA POINTS *</h1>
            <p className='text-xs md:text-sm underline'>click for more details</p>
          </div>
        </div>
      </div>

      {/* Parallax Care Section */}
      <Care />

      {/* Top Products Section */}
      <div className='bg-gradient-to-tr from-red-50 via-red-200 to-red-300 mb-3 p-6'>
        <h1 className='text-2xl md:text-3xl text-red-500 font-serif text-center p-2 pt-4'>Fantastic Finds</h1>
        <FantasticFinds />
      </div>

      {/* Services Section */}
      <div>
        <Services />
      </div>

      {/* Payment Slide Section */}
      <div className='m-5 py-4'>
        <PaymentSlide />
      </div>
    </>
  );
};

export default index;
