import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import Product_Item_Detail from './Product_Item_Detail'



interface prop {
    product: any
}

const ProductItem = ({ product }: prop) => {
    return (
        <div className='p-2 md:p-6 flex flex-col items-center shadow-md md:gap-2'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.attributes?.image?.data[0]?.attributes.url}
                alt={product?.attributes?.name}
                height={200}
                width={200}
                className=' object-contain h-40 w-40  md:h-64 md:w-64 rounded-lg   '
            />
            <h2>{product?.attributes?.name}</h2>
            <div className="flex gap-4">
                <h2>
                    {product?.attributes?.sellingPrice
                        ? `$${product?.attributes?.sellingPrice}`
                        : ''}
                </h2>
                <h2 className={`${product?.attributes?.sellingPrice && 'line-through'}`}>${product?.attributes?.mrp}</h2>

            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className=" text-green-600 font-bold hover:bg-green-600 hover:text-black">Add to cart</Button>

                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogDescription>
                            <Product_Item_Detail product={product} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default ProductItem
