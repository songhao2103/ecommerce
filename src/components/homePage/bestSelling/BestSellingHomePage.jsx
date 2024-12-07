import { useEffect, useState } from "react";
import { getDatas } from "../../../commonFunction/APIHandlerFunction/HTTPmethods";
import { endpointProductOfPage } from "../../../commonFunction/APIHandlerFunction/endpoint";
import CartProduct from "../../../commonComponent/cartProduct/CartProduct";

const BestSellingHomePage = () => {
  const [listProductsSelling, setListProductsSelling] = useState([]);

  //lấy dữ liệu từ api xuống
  useEffect(() => {
    const getDataComponent = async () => {
      try {
        const result = await getDatas(
          endpointProductOfPage + "products-of-page"
        );
        const newResult = result.slice(0, 4);
        setListProductsSelling(newResult);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getDataComponent();
  }, []);

  return (
    <div className="best-selling-homepage">
      <div className="hero-section-homepage">
        <div className="left">
          <div className="top">
            <div className="icon"></div>
            <p className="desc">This Month</p>
          </div>
          <div className="title-36">Best Selling Products</div>
        </div>
        <div className="right">
          <div className="btn-dark-pink">View All</div>
        </div>
      </div>

      <div className="list-products-selling">
        {listProductsSelling.map((product) => (
          <CartProduct product={product} key={product.idProduct}></CartProduct>
        ))}
      </div>
    </div>
  );
};

export default BestSellingHomePage;
