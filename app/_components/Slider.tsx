'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

interface props {
    sliderList: any;
}
const Slider = ({ sliderList }: props) => {

    return (
        <div className="px-5 md:px-1">
            <Carousel>
                <CarouselContent className=' '>

                    {sliderList.map((slider: any, index: number) => {
                        return (
                            <CarouselItem key={index}>
                                <Image
                                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.attributes?.image?.data?.[0]?.attributes?.url}
                                    alt="slider image"
                                    height={400} // Reduced height from 600 to 400
                                    width={1000} // Reduced width from 400 to 300
                                    className="w-full h-[200px] lg:h-[400px] object-cover rounded-lg "
                                />
                            </CarouselItem>
                        );
                    })}



                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Slider
