import React from 'react'
import { IoRocketOutline } from "react-icons/io5";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { GrSupport } from "react-icons/gr";

const index = () => {
    return (
        <>           
            <h4 className='text-red-400 text-center p-4 m-1 text-4xl font-semibold'>What We Believe</h4>
            <div className='grid grid-cols-2 justify-between md:grid-cols-4 m-3 p-6'>
                <div>
                    <IoRocketOutline />
                    <div>
                        <div className='font-medium text-xs'>Free shiping</div>
                        <div className='font-light text-xs'>orders $50 or more</div>
                    </div>
                </div>
                <div className=''>
                    <BsArrowCounterclockwise />
                    <div>
                        <div className='font-medium text-xs'>Free Returns</div>
                        <div className='font-light text-xs'>within 30 days</div>
                    </div>
                </div>
                <div className=''>
                    <CiCircleInfo />
                    <div>
                        <div className='font-medium text-xs'>Get 20% off </div>
                        <div className='font-light text-xs'>When you signup</div>
                    </div>
                </div>
                <div className=''>
                    <GrSupport />
                    <div>
                        <div className='font-medium text-xs'>We Support</div>
                        <div className='font-light text-xs'>24/7 amazing service</div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default index