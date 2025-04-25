import React from 'react'
import Image from '../../assets/images/career.png';
import { FcAdvance } from 'react-icons/fc';
const index = () => {
  return (
    <>
      <div className='m-3 p-5 relative'>
        <heade className='m-1 p-1'>
          <h1 className='text-5xl text-red-400 text-center font-bold'>Career</h1>
          <img src={Image} alt="image" />
        </heade>
        <section className='container bg-gradient-to-tl from-stone-50 via-red-50 to-red-200 border-red-600 rounded-4xl w-1/3 mx-auto flex justify-betweenm-5 p-5'>
          <input type="text" placeholder='Explore jobs' className='px-8 ' />
          <button><FcAdvance /></button>
        </section>
      </div>
    </>
  )
}

export default index
