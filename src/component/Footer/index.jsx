import React, { useState } from 'react'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import image from "../../assets/images/logo2.png";
import { Link } from 'react-router-dom';

const index = () => {

  return (
    <>
      <footer className='bg-gradient-to-r from-red-400 via-pink-500 to-red-600 p-2 '>
        {/* company logo name */}
        <header>
          <Link to='/'> <div className='flex text-xl justify-center font-bold items-center md:left-1/3 p-2 m-1  '>
            <img src={image} alt="lo" width={50} height={20} />
            <span className='ml-2'>Arista Mall</span>
          </div></Link>
        </header>
        <main className='container-content-responsive '>
          <div className='grid justify-around grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pl-8'>
            {/* section 1 */}
            <section>
              <div className='flex flex-col justify-items-start'>
                <h3 className='text-xl font-semibold'>Get to Know Us</h3>
                <Link to='/contact'><h6 className='hover:translate-x-2'>Contact us</h6></Link>
                <Link to='/about'><h6 className='hover:translate-x-2'>About us</h6></Link>
                <Link to='/career'><h6 className='hover:translate-x-2'>Career</h6></Link>
              </div>
            </section>

            {/* section 2 */}
            <section>
              <div className='flex-row '>
                <section className='flex flex-col justify-items-start'>
                  <h3 className='text-xl font-semibold'>Let Us Help You</h3>
                  <Link to='/faq' ><h6 className='hover:translate-x-2'>FAQ</h6></Link>
                  <Link to='/terms'><h6 className='hover:translate-x-2'>Terms and conditions </h6></Link>
                  <Link to='/contact'> <h6 className='hover:translate-x-2'>Help</h6> </Link>
                </section>

                <section className='flex flex-row  md:gap-3 w-full'>   Social:
                  <div className='p-1 cursor-pointer hover:scale-150'><a href="https://www.facebook.com" target="_blank"> <span className=''><FaFacebook /></span></a></div>
                  <div className='p-1 cursor-pointer hover:scale-150'><a href="https://in.pinterest.com" target="_blank"><FaSquareXTwitter /></a></div>
                  <div className='p-1 cursor-pointer hover:scale-150'><a href="https://www.instagram.com" target="_blank"><FaInstagramSquare /></a></div>
                </section>
              </div>
            </section>

            {/* section 3 */}
            <section>
              <div className='text-sm pr-6 pl-0'>
                <h3 className='font-semibold text-lg'>Mail Us</h3>
                <p>QuickCyber Mall Private Limited,</p>
                <p>Buildings Tech, It </p>
                <p>Our Tech Village,</p>
                <p>inner Ring Road,</p>
                <p>Bengaluru, 560103,</p>
                <p>Telephone: 021-12345678</p>
              </div>
            </section>
          </div>
        </main>
        <p className='relative m-auto text-sm text-center'>© 2022 Arista Mall. All rights reserved.</p>
      </footer>
    </>
  )
}
export default index
