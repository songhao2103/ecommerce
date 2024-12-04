const NavBarTabletMobile = () => {
  return (
    <div className="nav-bar-tablet-mobile-header">
      <label htmlFor="input-nav-bar" className="icon">
        <i className="fa-solid fa-bars"></i>
      </label>

      <input type="checkbox" hidden id="input-nav-bar" />

      <label htmlFor="input-nav-bar" className="overlay"></label>

      <ul className="list-options">
        <li className="item desc">Home</li>
        <li className="item desc">Products</li>
        <li className="item desc">Companys</li>
        <li className="item desc">Contact</li>
        <li className="item desc">About</li>
        <label htmlFor="input-nav-bar" className="close">
          <i className="fa-solid fa-xmark"></i>
        </label>
      </ul>
    </div>
  );
};

export default NavBarTabletMobile;
