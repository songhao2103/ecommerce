import { useRef, useState, useEffect, useMemo } from "react";
import HeroSectionSale from "./heroSection/HeroSectionSale";
import ProductsSales from "./ProductsSales/ProductsSales";
import { getDatas } from "../../../commonFunction/APIHandlerFunction/getDatas";
import { endpointProductOfPage } from "../../../commonFunction/APIHandlerFunction/endpoint";

const FlashSales = () => {
  const listProductsSaleElement = useRef(null);
  const boxListElement = useRef(null);
  const [currentPageList, setCurrentPageList] = useState(0);
  const [listProductSales, setListProductSales] = useState([]);

  //lấy dữ liệu từ mockAPI xuống
  useEffect(() => {
    const getDataComponent = async () => {
      try {
        const result = await getDatas(
          endpointProductOfPage + "products-of-page"
        );
        const newResult = result.filter((product) => product.discount > 0);
        setListProductSales(newResult);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getDataComponent();
  }, []);

  //hàm xác định số sản phầm trên 1 trang
  const getItemsPerPage = () => {
    if (window.innerWidth <= 739) {
      return 2; // Mobile
    } else if (window.innerWidth <= 1023) {
      return 3; // Tablet
    } else {
      return 4; // Laptop
    }
  };

  //hàm xử lý khi click vào nút chuyển trang
  const handleTurnPage = (value) => {
    const itemsPerPage = getItemsPerPage();
    if (
      value === 1 &&
      currentPageList < Math.ceil(listProductSales.length / itemsPerPage - 1)
    ) {
      setCurrentPageList((prevCurrentPageList) => prevCurrentPageList + 1);
    }

    if (value === -1 && currentPageList > 0) {
      setCurrentPageList((prevCurrentPageList) => prevCurrentPageList - 1);
    }
  };

  //hàm chuyển sang mỗi khi currentPageList tahy đổi
  useEffect(() => {
    const widthBoxListElement = boxListElement.current.offsetWidth;
    listProductsSaleElement.current.style.transform = `translateX(-${
      currentPageList * widthBoxListElement
    }px)`;
  }, [currentPageList]);

  //hàm tính toán vô hiệu hóa nút chuyển trang
  const disableButton = useMemo(() => {
    const itemsPerPage = getItemsPerPage();
    const before = currentPageList === 0;
    const after =
      currentPageList === Math.ceil(listProductSales.length / itemsPerPage - 1);
    return { before, after };
  }, [currentPageList]);
  return (
    <div>
      <HeroSectionSale
        handleTurnPage={handleTurnPage}
        currentPageList={currentPageList}
        disableButton={disableButton}
      ></HeroSectionSale>
      <ProductsSales
        listProductsSaleElement={listProductsSaleElement}
        listProductSales={listProductSales}
        boxListElement={boxListElement}
        handleTurnPage={handleTurnPage}
      ></ProductsSales>
    </div>
  );
};

export default FlashSales;
