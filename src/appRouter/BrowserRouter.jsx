import { createBrowserRouter } from "react-router-dom";
import AppContent from "../AppContent";
// import HomePage from "../components/homePage/HomePage";
import LogInAndRegister from "../components/logInaAndRegister/LogInAndRegister";
import Products from "../components/products/Products";

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
            element: <Products />,
          },

          {
            path: "/sign-up",
            element: <LogInAndRegister />,
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
