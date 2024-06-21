import React from 'react'
import banner from '@/public/banner_main.jpg'
import Image from 'next/image'
const Poster = () => {
    return (
        <div className="w-full  py-3">
            <Image src={banner} height={400} // Reduced height from 600 to 400
                width={1000} alt="poster"
                className='object-contain md:object-cover  md:h-full md:w-full rounded-md '
            />
        </div>
    )
}

export default Poster
