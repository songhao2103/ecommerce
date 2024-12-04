import { useEffect, useMemo, useRef } from "react";

const CartProduct = ({ product }) => {
  const imageElement = useRef(null);
  const boxImageElement = useRef(null);

  const updateImageWidth = () => {
    if (imageElement.current && boxImageElement.current) {
      const boxWidth = boxImageElement.current.offsetWidth;
      imageElement.current.style.width = `${boxWidth}px`;
    }
  };

  useEffect(() => {
    updateImageWidth();
    window.addEventListener("resize", updateImageWidth);
    return () => {
      window.removeEventListener("resize", updateImageWidth);
    };
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      currency: "VND",
    }).format(amount);
  };

  const priceFormatted = useMemo(() => {
    // Lấy giá trị sản phẩm và giảm giá, đảm bảo chúng là giá trị hợp lệ
    const price = product.price || 0; // Nếu không có giá trị thì mặc định là 0
    const discount = product.discount || 0; // Nếu không có giảm giá thì mặc định là 0%
    const oldPrice = discount !== 0 ? formatCurrency(price) : null;
    const newPrice = formatCurrency((price * (100 - discount)) / 100);
    return { oldPrice, newPrice };
  }, [product.price, product.discount]);

  return (
    <div className="cart-product">
      <div className="box-image" ref={boxImageElement}>
        <img
          ref={imageElement}
          className="image"
          src={product.imageProduct.default}
          alt=""
        />
      </div>
      <div className="content">
        <p className="desc name-product">{product.nameProduct}</p>
        <div className="bottom">
          <div className="box-price">
            <p className="desc new-price">{`${priceFormatted.newPrice} đ`}</p>
            {priceFormatted.oldPrice && (
              <p className="desc old-price">{`${priceFormatted.oldPrice} đ`}</p>
            )}
          </div>
          <div className="rating">
            <div className="box-icon">
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
            <p className="desc quantity-rating">(88)</p>
          </div>
        </div>
      </div>

      <div className="plane-above">
        <div className="discount">
          <p className="desc">{`-${product.discount}%`}</p>
        </div>
        <div className="box-icon">
          <div className="icon add-to-cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="icon wishlist">
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
