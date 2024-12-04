import { useEffect, useState } from "react";

const expirationDate = new Date("2025-02-14T00:00:00").getTime();

const HeroSectionSale = ({
  handleTurnPage,
  currentPageList,
  disableButton,
}) => {
  const [expirationTime, setExpirationTime] = useState({
    expireDays: "",
    expireHours: "",
    expireMinutes: "",
    expireSeconds: "",
  });

  const prefixDate = (value) => (value < 10 ? `0${value}` : `${value}`);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime(); // Tính thời gian hiện tại 1 lần
      const timeDifference = expirationDate - now;
      const newExpireDays = Math.floor(timeDifference / 86400000);
      const newExpireHours = Math.floor((timeDifference % 86400000) / 3600000);
      const newExpireMinutes = Math.floor((timeDifference % 3600000) / 60000);
      const newExpireSeconds = Math.floor((timeDifference % 60000) / 1000);

      setExpirationTime({
        ...expirationTime,
        expireDays: prefixDate(newExpireDays),
        expireHours: prefixDate(newExpireHours),
        expireMinutes: prefixDate(newExpireMinutes),
        expireSeconds: prefixDate(newExpireSeconds),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expirationTime]);

  return (
    <div className="hero-section-sale">
      <div className="top">
        <div className="icon"></div>
        <div className="desc">Today's</div>
      </div>

      <div className="bottom">
        <div className="left">
          <div className="title-36">Flash Sales</div>

          <div className="date-sale">
            <div className="item">
              <p className="desc">Days</p>
              <p className="date">{expirationTime.expireDays}</p>
            </div>

            <div className="box-icon">
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
            <div className="item">
              <p className="desc">Hours</p>
              <p className="date">{expirationTime.expireHours}</p>
            </div>

            <div className="box-icon">
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
            <div className="item">
              <p className="desc">Minutes</p>
              <p className="date">{expirationTime.expireMinutes}</p>
            </div>

            <div className="box-icon">
              <div className="icon"></div>
              <div className="icon"></div>
            </div>
            <div className="item">
              <p className="desc">Seconds</p>
              <p className="date">{expirationTime.expireSeconds}</p>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="box-icon">
            <div
              className={`icon ${disableButton.before ? "disable" : ""}`}
              onClick={() => handleTurnPage(-1)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div
              className={`icon ${disableButton.after ? "disable" : ""}`}
              onClick={() => handleTurnPage(1)}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionSale;
