import { useEffect } from "react";
import { useRef, useState } from "react";

const Banner = () => {
  const listBannerElement = useRef(null);

  let currentIndex = useRef(0);

  useEffect(() => {
    const moveBanner = () => {
      const widthElement = listBannerElement.current.offsetWidth;

      if (listBannerElement.current) {
        currentIndex.current++;
        listBannerElement.current.style.transform = `translateX(-${
          currentIndex.current * widthElement
        }px)`;
      }

      if (currentIndex.current === 6) {
        listBannerElement.current.style.transition = "none";
        currentIndex.current = 0;
        listBannerElement.current.style.transform = `translateX(0)`;
        setTimeout(
          () =>
            (listBannerElement.current.style.transition =
              "transform 0.7s ease-in-out"),
          50
        );
      }
    };

    const interval = setInterval(moveBanner, 3000);
    return () => clearInterval(interval);
  }, []);

  //hàm xử lý khi click vào next-banner
  const handleClickNextBanner = (value) => {
    if ((currentIndex.current === 6) & (value === 1)) {
    }
  };
  return (
    <div className="box-banner">
      <div className="list-banner" ref={listBannerElement}>
        {/* banner 1 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <div className="icon">
                <i className="fa-brands fa-apple"></i>
              </div>
              <p className="desc">iPhone 14 Series</p>
            </div>
            <p className="title-48">Up to 10% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/banner_1.png"
              alt=""
            />
          </div>
        </div>

        {/* banner 2 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <p className="desc">Laptop Dell Inspiron 14 5430 R1605S </p>
            </div>
            <p className="title-48">Up to 15% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/banner_3.png"
              alt=""
            />
          </div>
        </div>

        {/* banner 3 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <p className="desc">Chuột Logitech G Pro</p>
            </div>
            <p className="title-48">Up to 30% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/6736f195909d2.png"
              alt=""
            />
          </div>
        </div>

        {/* banner 4 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <p className="desc">Bàn Phím Fuhlen L500S</p>
            </div>
            <p className="title-48">Up to 20% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/6741536e6b8ec.png"
              alt=""
            />
          </div>
        </div>

        {/* banner 5 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <p className="desc">Audio-Technica ATH-M20X</p>
            </div>
            <p className="title-48">Up to 50% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/Lovepik_com-401422578-black-and-red-headphone-wireless-headset.png"
              alt=""
            />
          </div>
        </div>

        {/* banner 1 */}
        <div className="banner">
          <div className="content">
            <div className="trademark">
              <div className="icon">
                <i className="fa-brands fa-apple"></i>
              </div>
              <p className="desc">iPhone 14 Series</p>
            </div>
            <p className="title-48">Up to 10% off Voucher</p>
            <div className="bottom">
              <p className="desc">Shop Now</p>
              <div className="icon">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>

          <div className="image">
            <img
              src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/banner_1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="box-icon-next-banner">
        <div className="icon">
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <div className="icon">
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default Banner;
