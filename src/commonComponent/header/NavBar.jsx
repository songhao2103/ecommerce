import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <ul className="header-nav-bar">
      <NavLink className="item desc">Home</NavLink>
      <li className="item desc">Products</li>
      <li className="item desc">Company</li>
      <div className="box-page item desc">
        <li className="desc">Page</li>
        <ul className="option-page">
          <li className="desc">Contact</li>
          <li className="desc">About</li>
        </ul>
      </div>
      <NavLink to="/sign-up" className="item desc">
        Sign Up
      </NavLink>
    </ul>
  );
};

export default NavBar;
