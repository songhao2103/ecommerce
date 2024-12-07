import Header from "./commonComponent/header/Header";
import FooterComponent from "./commonComponent/footer/FooterComponent";
import { Outlet } from "react-router-dom";
const AppContent = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
    </>
  );
};

export default AppContent;
