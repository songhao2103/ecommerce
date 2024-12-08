import { createBrowserRouter } from "react-router-dom";
import AppContent from "../AppContent";
// import HomePage from "../components/homePage/HomePage";
import LogInAndRegister from "../components/logInaAndRegister/LogInAndRegister";
import Products from "../components/products/Products";
import ProductDetails from "../components/productDetails/ProductDetails";

const createAppRouter = () => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <AppContent />,

        children: [
          {
            index: true,
            // element: <HomePage />,
            element: <ProductDetails />,
          },

          {
            path: "/sign-up",
            element: <LogInAndRegister />,
          },
          {
            path: "/products",
            element: <Products></Products>,
          },
        ],
      },
    ],
    {
      basename: "/ecommerce",
    }
  );
};
export default createAppRouter;
