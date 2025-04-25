import React from 'react';
import Caraousel from '../../component/Caraousel '
import image from '../../assets/images/refer.jpeg';
import FantasticFinds from '../../component/FantasticFind';
import Services from '../../component/Services';
import PaymentSlide from '../../component/PaymentSlide'
import Care from '../../component/Care'

const index = () => {
  return (
    <>
      <div className='p-6 '>
        <Caraousel />
      </div>
      {/* refer section */}
      <div className='bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 p-2 shadow-md relative z-20 m-4 animate-pulse duration-1000 delay-700 '>
        <div className='flex justify-evenly'>
          <img src={image} alt="refer-image" className='p-2 h-32 mt-4 m-1' />
          <div className='flex flex-col font-semibold text-white text-center p-5 m-5 font-stretch-extra-expanded gap-2 font-sans'>
            <p>REFER FRIENDS</p>
            <h1 className='text-4xl'>GET 100 ARISTA POINTS *</h1>
            <p className='text-xs underline'>click for more details </p>
          </div>
        </div>
      </div>
      {/* parallax  care section */}
      <Care/>

      {/* top products */}
      <div className='bg-gradient-to-tr from-red-50 via-red-200 to-red-300 mb-3 p-6'>
        <h1 className='text-3xl text-red-500 font-serif text-center p-2 pt-4'>Fantastic Finds</h1>
        <FantasticFinds />
      </div>
       
      <div>
        <Services/>
      </div>
      <div className='m-5 py-4'>
        <PaymentSlide/>
      </div>

    </>
  )
}

export default index
