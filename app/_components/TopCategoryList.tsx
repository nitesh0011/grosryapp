'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface props {
    categoryList: any
}
const TopCategoryList = ({ categoryList }: props) => {
    const path = usePathname()
    return (
        <div className='py-4'>
            <div className='flex justify-between overflow-auto gap-5  mx-7 md:mx-20  '>

                {categoryList.map((category: any) => (
                    <Link href={'/product-category/' + (category.attributes.name)} key={category.attributes.name}>
                        <div key={category.id} className={`flex flex-col ${path === `/product-category/${category.attributes.name}`
                            ? 'bg-green-600'
                            : 'bg-green-100'
                            }  gap-3 w-[150px] min-w-[100px] p-3 md:py-3 rounded-lg group cursor-pointer hover:bg-green-600 items-center`}>
                            <Image className='group-hover:scale-125 transition-all ease-in-out ' src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes.url} alt={'list'} height={50} width={50} />
                            <h1 className=''>{category?.attributes?.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopCategoryList