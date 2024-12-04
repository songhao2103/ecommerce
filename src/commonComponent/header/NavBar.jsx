const NavBar = () => {
  return (
    <ul className="header-nav-bar">
      <li className="item desc">Home</li>
      <li className="item desc">Products</li>
      <li className="item desc">Company</li>
      <div className="box-page item desc">
        <li className="desc">Page</li>
        <ul className="option-page">
          <li className="desc">Contact</li>
          <li className="desc">About</li>
        </ul>
      </div>
      <li className="item desc">Sign Up</li>
    </ul>
  );
};

export default NavBar;
