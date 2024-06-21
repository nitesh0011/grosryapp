'use client'
import React, { useContext, useEffect, useState } from 'react'
import { LoaderIcon, ShoppingBasket, Trash } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'

import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'
import { SubamountContext } from '../_context/SubamountContext'


interface User {
    id: string | number;
    // Add other properties of the user object here
}

const ShoppingIcon = () => {
    const contextValue = useContext(SubamountContext);
    

    const { setSubamount = () => {}, subamount } = contextValue || {};
   


    const [cartItemsLength, setCartItemsLength] = useState(0);
    const [totalCartItems, setTotalCartItems] = useState<any>([]);
    const [jwt, setJwt] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchData = async () => {
            const jwtItem = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
            const userItem = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;

            setJwt(jwtItem || '');
            setUser(userItem ? JSON.parse(userItem) : null);
        };

        fetchData();
        // Add dependencies if needed
    }, []);



    useEffect(() => {
        const getCartItems = async () => {
            if (user && user.id) {
                try {
                    const cartItems = await GlobalApi.getItemsCart(user.id, jwt);

                    setTotalCartItems(cartItems)
                    const cartitemsLength = cartItems?.length || 0;
                    setCartItemsLength(cartitemsLength);

                    const subtotalAmount = cartItems.reduce((total: any, item: any) => total + (item.amount || item.attributes.amount), 0);
                    setSubamount(subtotalAmount)
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                    setCartItemsLength(0);
                }
            } else {
                console.log('User data not available');
                setCartItemsLength(0);
            }
        };
        getCartItems()
    })



    const deletButton = async (productid: number) => {
        try {

            setLoadingStates((prevState) => ({ ...prevState, [productid]: true }));

            await GlobalApi.deleteItemsCart(productid, jwt)

            // removeFromCart(productID)
            toast.success("item removed succesfully")
           
        } catch (error: any) {
            console.log(error.message);
            toast.error("erroe while removing item")
        } finally {
            setLoadingStates((prevState) => ({ ...prevState, [productid]: false }));
        }
    }

  



    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button  ">
                        <div className='flex gap-2' >
                            <ShoppingBasket />
                            <p>{cartItemsLength }</p>
                        </div>
                    </label>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col gap-3  ">
                        <div className=" overflow-y-auto h-[34rem]">
                            {...totalCartItems.map((product: any) => (
                                <div key={product?.id} className="flex gap-4 items-center px-5 py-3">
                                    <Image
                                        className="object-contain border-2 border-slate-200 p-2"
                                        alt="images"
                                        height={70}
                                        width={70}
                                        src={
                                            typeof product?.image?.attributes?.url === 'string'
                                                ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.image?.attributes?.url}`
                                                : typeof product?.attributes?.image?.data?.[0]?.attributes?.url === 'string'
                                                    ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product?.attributes?.image?.data?.[0]?.attributes?.url}`
                                                    : '/fallback-image.png' // Replace with your fallback image URL
                                        }
                                    />
                                    <div>
                                        <h1 className=" font-semibold">{product?.attributes?.name}</h1>
                                        <p>Quantity {product?.attributes?.quantity}</p>
                                        <p className=" font-semibold">${product.amount || product?.attributes?.amount}</p>
                                    </div>
                                    <button className=" ml-auto"
                                        onClick={() => deletButton(product?.id)}
                                    >
                                        {loadingStates[product?.id] ? <LoaderIcon className=" animate-spin" /> : <Trash />}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="w-full flex flex-col  mt-auto  rounded-sm text-green-700 font-bold text-xl   ">
                            <div className='flex justify-between items-center p-4'>
                                <h2>subtotal =</h2>
                                <h2>${subamount}</h2>
                            </div>
                          <Link 
                           href={{
                            pathname: '/checkout',
                            query: {
                                subamount: subamount + 15
                              } 
                          }}
                          >
                          <div className=' bg-green-800 w-full flex justify-center p-3 rounded-sm'>
                              <h1 className=' font-semibold text-white'>Cheackout</h1>
                            </div>
                          </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )}

export default ShoppingIcon