import Image from 'next/image';
import React from 'react'
import ProductItem from './ProductItem';

interface props {
    getProductList:any;
}

const GetProducts = ({getProductList}:props) => {
  return (
    <>
    <h1 className=" font-extrabold text-green-600 text-xl md:text-2xl p-3">Popular Products</h1>
    <div className=' grid gap-6 md:gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      
      {getProductList.map((product:any,index:number) =>index<8&& (
         <div key={index}>
            <ProductItem product={product}/> 
           
        </div>
      ))}
    </div>
    </>
  )
}

export default GetProducts
 