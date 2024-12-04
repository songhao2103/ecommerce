const BoxRight = () => {
  return (
    <div className="box-right-header">
      <div className="search">
        <input type="text" placeholder="Search?" />
        <div className="icon-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="icon wishlist-header">
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="icon shopping-cart">
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
      <div className="box-user-header">
        <div className="icon">
          <i className="fa-regular fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default BoxRight;
