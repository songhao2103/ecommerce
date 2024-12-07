const Categories = () => {
  return (
    <div className="categories">
      <div className="hero-section">
        <div className="top">
          <div className="icon"></div>
          <p className="desc">Categories</p>
        </div>
        <p className="title-36">Browse By Category</p>
      </div>

      <div className="list-categories">
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-mobile-screen-button"></i>
          </div>
          <p className="desc">Phones</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-laptop"></i>
          </div>
          <p className="desc">Computers</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-regular fa-clock"></i>
          </div>
          <p className="desc">SmartWatch</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-camera-retro"></i>
          </div>
          <p className="desc">Camera</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-headphones-simple"></i>
          </div>
          <p className="desc">Headphones</p>
        </div>
        <div className="item">
          <div className="icon">
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <p className="desc">Gaming</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
