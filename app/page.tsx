import { Suspense } from 'react';
import CategoryListComp from "./_components/CategoryListComp";
import Footer from "./_components/Footer";
import GetProducts from "./_components/GetProducts";
import Poster from "./_components/Poster";
import Slider from "./_components/Slider";
import GlobalApi from './_utils/GlobalApi';


async function getData() {
  try {
    const sliderList = await GlobalApi.getSliders();
    const CategoryList = await GlobalApi.getCategoryList();
    const getProductList = await GlobalApi.getProducts();
    
    return { sliderList, CategoryList, getProductList };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { sliderList: [], CategoryList: [], getProductList: [] };
  }
}
export default async function Home() {
  const { sliderList, CategoryList, getProductList } = await getData();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="px-8 py-16 md:py-20 md:px-16 min-h-screen">
        <Slider sliderList={sliderList} />
        <CategoryListComp categoryList={CategoryList} />
        <GetProducts getProductList={getProductList} />
        <Poster />
        <Footer />
      </main>
    </Suspense>
  );
}