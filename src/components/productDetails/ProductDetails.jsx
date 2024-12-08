import { useEffect, useMemo, useRef, useState } from "react";

import { getDatas } from "../../commonFunction/APIHandlerFunction/HTTPmethods";
import { endpointProductOfPage } from "../../commonFunction/APIHandlerFunction/endpoint";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [imageProductDefault, setImageProductDefault] = useState("");

  //lấy product từ sever
  //lấy các ảnh các màu của product
  let listImageOfProducts = useRef(null);
  useEffect(() => {
    const getDatasComponent = async () => {
      try {
        const result = await getDatas(
          endpointProductOfPage + "products-of-page/3"
        );
        setProductDetails(result);
        listImageOfProducts.current = Object.keys(result.imageProduct).filter(
          (key) => result.imageProduct[key] !== "" && key !== "default"
        );
        setImageProductDefault(result.imageProduct.default);
      } catch (error) {
        console.log("Lấy dữ liệu bị lỗi", error);
      }
    };
    getDatasComponent();
  }, []);

  //product price format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      currency: "VND",
    }).format(amount);
  };
  const priceFormatted = useMemo(() => {
    if (productDetails) {
      const oldPrice =
        productDetails.discount !== 0
          ? formatCurrency(productDetails.price)
          : null;
      const newPrice = formatCurrency(
        (productDetails.price * (100 - productDetails.discount)) / 100
      );

      return { oldPrice, newPrice };
    }
  }, [productDetails]);

  return (
    // {productDetails&&}
    <div className="product-details-page">
      {productDetails && (
        <div className="product-details">
          <div className="box-images">
            <div className="list-images">
              {listImageOfProducts.current &&
                listImageOfProducts.current.map((key) => (
                  <img
                    key={key}
                    src={productDetails.imageProduct[key]}
                    alt=""
                  />
                ))}
            </div>

            <div className="image-default">
              <img src={imageProductDefault} alt="" />
            </div>
          </div>

          <div className="box-right">
            <div className="info-product">
              <p className="title-24 name-product">
                {productDetails.nameProduct}
              </p>
              <div className="box-icon rating">
                <div className="icon">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-star"></i>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-star"></i>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-star"></i>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-star"></i>
                </div>
              </div>

              <div className="box-price">
                <p className="new-price desc">{`${priceFormatted.newPrice}đ`}</p>

                {priceFormatted.oldPrice && (
                  <div className="old-price desc">
                    {`${priceFormatted.oldPrice}đ`}
                  </div>
                )}
              </div>
              <p className="desc describe">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </p>
            </div>

            <div className="box-options">
              <div className="box-color">
                <p className="desc">Colours:</p>
                {listImageOfProducts.current.map((key) => (
                  <p
                    className={`desc color ${
                      imageProductDefault === productDetails.imageProduct[key]
                        ? "active"
                        : ""
                    }`}
                    key={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                ))}
              </div>
              <div className="bottom">
                <div className="box-quantity">
                  <p className="desc icon increase">-</p>
                  <p className="quantity desc">1</p>
                  <p className="desc icon decrease">+</p>
                </div>
                <div className="btn-dark-pink">Buy now</div>

                <div className="icon-wishlist">
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
