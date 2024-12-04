import BoxRight from "./BoxRight";
import Logo from "./Logo";
import NavBar from "./NavBar";
import NavBarTabletMobile from "./NavBarTabletMobile";

const Header = () => {
  return (
    <div className="header">
      <Logo></Logo>
      <NavBarTabletMobile></NavBarTabletMobile>
      <NavBar></NavBar>
      <BoxRight></BoxRight>
    </div>
  );
};

export default Header;
