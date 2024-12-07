import Banner from "./banner/Banner";
import BestSellingHomePage from "./bestSelling/BestSellingHomePage";
import Categories from "./categories/Categories";
import Featured from "./featured/Featured";
import FlashSales from "./flashSales/FlashSales";
import ShopServices from "./shopServices/ShopServices";

const HomePage = () => {
  return (
    <div className="home-page">
      <Banner> </Banner>
      <FlashSales></FlashSales>
      <Categories></Categories>
      <BestSellingHomePage></BestSellingHomePage>
      <Featured></Featured>
      <ShopServices></ShopServices>
    </div>
  );
};

export default HomePage;
