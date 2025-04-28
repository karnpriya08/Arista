import React from 'react';
import { Parallax } from 'react-parallax';
import image from '../../assets/images/C2.avif';

const index = () => {
  return (
    <div className=''>
      <div className='flex flex-col items-center text-center py-10 bg-gradient-to-tl from-stone-100 via-transparent to-violet-300'>
        <h1 className='text-5xl font-bold'>WE CARE</h1>
        <p className='mt-4'>
          We do not ask for your bank account or card details verbally or telephonically.
        </p>
        <p className='mt-2'>
          We also do not ask for money to participate in any of our offers or run any lucky draws.
        </p>
      </div>
      <div className=' p-3'>
        <Parallax bgImage={image} strength={300}>
          <div style={{ height: '500px' }}>
          </div>
        </Parallax>
      </div>
    </div>
  );
};

export default index;
