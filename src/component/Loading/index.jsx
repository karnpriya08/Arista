import React from 'react';
import { Blocks } from 'react-loader-spinner'

const index = () => {
    return (
        <div className='grid grid-row-1 text-3xl p-28 text-red-300 space-y-11 lg:grid-rows-2'>
            <h1 className=' md:text-center'>Loading.....</h1>
            <div className=' lg:relative left-96 '> <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />  </div>
        </div>
    )
}

export default index;