import CategoryListComp from "./_components/CategoryListComp";
import Footer from "./_components/Footer";
import GetProducts from "./_components/GetProducts";
import Poster from "./_components/Poster";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {

  const sliderList = await GlobalApi.getSliders();
  const CategoryList = await GlobalApi.getCategoryList();
  const getProductList = await GlobalApi.getProducts();
  
  return (
    
    <main className="  px-8 py-16  md:py-20 md:px-16  min-h-screen">
      <Slider sliderList= {sliderList}/>
      <CategoryListComp categoryList={CategoryList} />
      <GetProducts getProductList={getProductList}/>
      <Poster/>
      <Footer/>
    </main>
    
  );
}
