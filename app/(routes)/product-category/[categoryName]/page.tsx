import ProductItem from '@/app/_components/ProductItem';
import TopCategoryList from '@/app/_components/TopCategoryList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react'

const productCategory = async ({ params }: any) => {
  const CategoryList = await GlobalApi.getCategoryList();
  const getProductList = await GlobalApi.getProductsList(params.categoryName);
  return (
    <div className='  px-8 py-16  md:py-20 md:px-16 '>
      <h1 className=' w-full flex p-4 bg-green-600 text-white font-bold text-xl justify-center'>{params.categoryName}</h1>
      <div className=''>

        {/* productCategory{(params.categoryName).replace(/%/g,"-")} */}
        <TopCategoryList categoryList={CategoryList} />
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:px-10'>
          {getProductList.map((product: any, index: number) => (
            <div key={index} >
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default productCategory
