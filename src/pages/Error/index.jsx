import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/error.svg'

const index = () => {
  return (
    <div className='text-center text-2xl p-10 space-y-5'>
      <img src={Image} alt="image" />
    
    <h1 className='font-extrabold bg-red-300 p-5' > OOooPPPsssss.. </h1>
    <br />
    <p >Something went wrong ! Go back to : </p>
    <span className='font-bold'>Home Page</span>
    <br />
    <div className='text-center'>
     <Link to="/"><button className='bg-gray-400 border rounded-3xl  px-8 m-4 ' type='submit'>Home Page</button></Link> 
      </div>
  </div>
  )
}

export default index
