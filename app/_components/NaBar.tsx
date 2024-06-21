'use client'
import { Button } from '@/components/ui/button'
import { CircleUserRound, CreditCard, Keyboard, ListMinusIcon, LogOut, Settings, ShoppingBasket, User } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import logo from '@/public/grocery.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import GlobalApi from '../_utils/GlobalApi'
import ShoppingIcon from './ShoppingIcon'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SubamountProvider } from '../_context/SubamountContext'



const NavBar = () => {
    const router = useRouter()
    const path = usePathname()
    const [categoryList, setCategoryList] = useState<any>([])
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        getCategoryList();
        const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null
        setIsLogin(!!jwt)
    }, [])
    const getCategoryList = () => {
        GlobalApi.getCategory().then((resp: any) => {
            // console.log("response category list-->", resp.data.data)
            setCategoryList(resp.data.data)
        })
    }

    const signOut = () => {
        sessionStorage.clear();
        router.push('/sign-in')
    }


    return (
        <div className='md:px-16 md:py-2 px-8 py-1 fixed  flex justify-between  top-0 w-full items-center z-[999] bg-white shadow-sm'>
            <div className='flex items-center gap-2 md:gap-16'>
                <Link href='/' className='flex gap-2 items-center'>
                    <Image src={logo} alt="logo" height={53} width={53} />
                    <div className='text-2xl font-bold   hidden md:block '>
                        <p className=' text-orange-400 '>Grocery</p>
                        <p className='text-green-500'>Store</p>
                    </div>
                </Link>
                <div className='p-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='px-4 py-2 bg-slate-200 rounded-full hidden md:block'> <div className='flex gap-3 '> <ListMinusIcon /> Category</div> </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {categoryList.map((category: any) => {

                                return <DropdownMenuItem key={category.id}>
                                    <div className='flex gap-3'>
                                        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes.url} alt={'list'} height={23} width={23} />
                                        <h1>{category?.attributes?.name}</h1>
                                    </div>
                                </DropdownMenuItem>
                            })}

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
            <div className='md:w-2/5'>
                <Input type="text" placeholder="search products.." />
            </div>
            <div className='flex items-center gap-2 md:gap-16 p-2'>
                <div >
                    <SubamountProvider>

                        <ShoppingIcon />
                    </SubamountProvider>

                </div>
                <div className='hidden md:block'>


                    {
                    
                    !isLogin ? <Link href='/sign-in'>
                       {path != 'http://localhost:3000/' && <Button className='text-white'>login</Button>}
                    </Link> :


                        <DropdownMenu>
                            <DropdownMenuTrigger className='px-4 py-2 bg-slate-200 rounded-full hidden md:block'>
                                <div className='flex gap-3 '>
                                    <CircleUserRound />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar
