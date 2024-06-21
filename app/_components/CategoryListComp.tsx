import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface props {
  categoryList: any
}
const CategoryListComp = ({ categoryList }: props) => {
  return (
    <div className='py-4'>
      <h1 className=" font-extrabold text-green-600 text-xl md:text-2xl">Shop By Category</h1>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5 py-3 '>

        {categoryList.map((category: any) => (
          <Link href={'/product-category/' + category.attributes.name} key={category.id}>
            <div  className='flex flex-col items-center bg-green-100 p-3 md:py-3 rounded-lg group cursor-pointer hover:bg-green-600'>
              <Image className='group-hover:scale-125 transition-all ease-in-out ' src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes.url} alt={'list'} height={50} width={50} />
              <h1 className=' font-bold'>{category?.attributes?.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryListComp
