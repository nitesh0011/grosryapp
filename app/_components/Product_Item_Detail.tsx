'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { LoaderIcon, ShoppingBagIcon } from 'lucide-react';


import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useStore } from '../_context/UpdateCart';
import GlobalApi from '../_utils/GlobalApi';



interface prop {
    product: any;
}
const Product_Item_Detail = ({ product }: prop) => {
    // console.log("product,htmlFor id",product);
    const { count, inc } = useStore()
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const [jwt, setJwt] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [productTotalPrice, setProductTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const storedJwt = sessionStorage.getItem('jwt');
        const userString = sessionStorage.getItem('user');
        setJwt(storedJwt);
        if (userString) {
            setUser(JSON.parse(userString));
        }
        setProductTotalPrice(
            product?.attributes?.sellingPrice || product?.attributes?.mrp
        );
    }, [product]);

        const handleAddToCart = () => {
            setLoader(true)
            if (!jwt) {
                router.push("/sign-in")
                return;
            }


            const requestBody = {
                data: {
                    name: product.attributes.name,
                    amount: (quantity * productTotalPrice),
                    quantity: quantity.toString(),
                    userID: user.id,
                    productID: product?.id,
                    image: product?.attributes?.image?.data[0]

                }
            };


            GlobalApi.PostProductsList(requestBody, jwt).then((resp:any) => {
                toast.success("Added to cart.")
                setLoader(false)
                inc()
            }, (e: any) => {
                toast.error("Error while adding to cart.");
                console.log(e)
                setLoader(false)
            })

            // addToCart(requestBody.data);
        }
     

        return (
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 p-3 text-black bg-white" >

                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.attributes?.image?.data[0]?.attributes.url}
                        alt={product?.attributes?.name}
                        height={200}
                        width={200}
                        className='bg-slate-200 p-5 object-contain h-[340px] w-[300px]  rounded-lg   '
                    />
                    <div className='flex flex-col gap-3 px-3'>
                        <h2 className='text-2xl font-bold'>{product?.attributes?.name}</h2>
                        <h2 className='text-sm font-bold text-gray-500'>{product?.attributes?.description}</h2>
                        <div className="flex gap-4">
                            <h2 className='font-bold text-3xl'>
                                {product?.attributes?.sellingPrice
                                    ? `$${product?.attributes?.sellingPrice}`
                                    : ''}
                            </h2>
                            <h2 className={`${product?.attributes?.sellingPrice && 'line-through'} font-bold text-3xl text-gray-500`}>${product?.attributes?.mrp}</h2>
                        </div>
                        <h2 className='font-medium text-lg '>Quantity {product?.attributes?.itemQuantityType}</h2>
                        <div className='flex flex-col items-baseline gap-3'>
                            <div className='flex gap-3'>
                                <div className='p-2 border flex gap-4 items-center  px-3'>
                                    <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                                    <h2>{quantity}</h2>
                                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                                <h2 className='text-xl font-bold'> = {(quantity * productTotalPrice)}</h2>
                            </div>
                            <Button className='flex gap-3 bg-green-600 hover:bg-green-800'
                                onClick={handleAddToCart}

                            >
                                {loader ? <LoaderIcon className=" animate-spin" /> : <ShoppingBagIcon />}

                                Add to Cart
                            </Button>
                        </div>
                        <h2><span className='font-bold'>Category: </span>{product?.attributes?.categories?.data[0].attributes.name}</h2>
                    </div>
                </div>
            </div>

        )
    }

export default Product_Item_Detail

