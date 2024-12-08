import { useEffect, useReducer } from "react";
import { getDatas } from "../../commonFunction/APIHandlerFunction/HTTPmethods";
import { endpointProductOfPage } from "../../commonFunction/APIHandlerFunction/endpoint";
import CartProduct from "../../commonComponent/cartProduct/CartProduct";

//initialState=================
const initialState = {
  listProductsData: [], //danh sách products của trang web
  listFilteredProductsData: [], //danh sách products sau khi lọc
  listProductsRender: [], //danh sách products được render ra
  quantityProducstDefault: 0, //Số lượng sản phẩm 1 trang
  quantityProductsRender: 0, //Số lượng sản phẩm được render ra
  inputSearchData: "",

  //Điều kiện để lọc
  filterConditions: {
    company: "all",
    classify: "all",
    sort: "",
  },
};

//reducer================
const reducerProducts = (state, action) => {
  switch (action.type) {
    //xử lý khởi tạo giá trị ban đầu
    case "GETDATAFROMSERVER":
      return {
        ...state,
        listProductsData: action.payload.result,
        listFilteredProductsData: action.payload.result,
      };

    //Cập nhật listProductsRender
    case "UPDATELISTPRODUCTSRENDER":
      return {
        ...state,
        listProductsRender: action.payload.newListProductsRender,
      };

    //cập nhật lại quantityProductsRender dựa vào kích thước màn hình
    case "UPDATEQUANTITYPRODUCTSDEFAULT": {
      if (action.payload.windowWidth > 1023) {
        return {
          ...state,
          quantityProducstDefault: 8,
          quantityProductsRender: 8,
        };
      } else if (action.payload.windowWidth > 739) {
        return {
          ...state,
          quantityProducstDefault: 6,
          quantityProductsRender: 6,
        };
      } else {
        return {
          ...state,
          quantityProducstDefault: 4,
          quantityProductsRender: 4,
        };
      }
    }

    //cập nhật lại số lượng sản phẩm render khi click view more
    case "VIEWMOREPRODUCTS": {
      if (
        state.quantityProductsRender + state.quantityProducstDefault <
        state.listFilteredProductsData.length
      ) {
        const newQuantityProductsRender =
          state.quantityProductsRender + state.quantityProducstDefault;
        return { ...state, quantityProductsRender: newQuantityProductsRender };
      } else {
        return {
          ...state,
          quantityProductsRender: state.listFilteredProductsData.length,
        };
      }
    }

    //xử lý thay đổi của data input search
    case "CHANGEINPUTSEARCH":
      return { ...state, inputSearchData: action.payload.element.value };

    //cập nhật lại filterConditions
    case "UPDATEFILTERCONDITIONS":
      return {
        ...state,
        filterConditions: {
          ...state.filterConditions,
          [action.payload.conditions1]: action.payload.conditions2,
        },
      };

    //filter products
    case "FILTERPRODUCTS": {
      const { company, classify, sort } = state.filterConditions;
      const inputSearchData = state.inputSearchData;
      let newListFilteredProductsData = [...state.listProductsData].filter(
        (product) => {
          const isCompanyValid =
            company === "all" || company === product.company;
          const isClassifyValid =
            classify === "all" || classify === product.deviceType;
          const isSearchValid =
            !inputSearchData ||
            product.nameProduct.toLowerCase().includes(inputSearchData);

          return isClassifyValid && isCompanyValid && isSearchValid;
        }
      );

      if (sort === "decrease") {
        newListFilteredProductsData.sort(
          (a, b) => b.price * (100 - b.discount) - a.price * (100 - a.discount)
        );
      } else if (sort === "increase") {
        newListFilteredProductsData.sort(
          (a, b) => a.price * (100 - a.discount) - b.price * (100 - b.discount)
        );
      } else if (sort === "sale") {
        newListFilteredProductsData = newListFilteredProductsData.filter(
          (product) => product.discount > 0
        );
      }

      return {
        ...state,
        listFilteredProductsData: newListFilteredProductsData,
        quantityProductsRender: state.quantityProducstDefault,
      };
    }

    default:
      return state;
  }
};
const Products = () => {
  const [state, dispatch] = useReducer(reducerProducts, initialState);

  //gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const getDataComponent = async () => {
      try {
        const result = await getDatas(
          endpointProductOfPage + "products-of-page"
        );

        dispatch({
          type: "GETDATAFROMSERVER",
          payload: {
            result,
          },
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getDataComponent();
  }, []);

  //cập nhật lại listProductsRender
  useEffect(() => {
    const newListProductsRender = state.listFilteredProductsData.slice(
      0,
      state.quantityProductsRender
    );

    dispatch({
      type: "UPDATELISTPRODUCTSRENDER",
      payload: {
        newListProductsRender,
      },
    });
  }, [state.quantityProductsRender, state.listFilteredProductsData]);

  //Cập nhật quantityProducsDefault
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: "UPDATEQUANTITYPRODUCTSDEFAULT",
        payload: {
          windowWidth: window.innerWidth,
        },
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //hàm xử lý khi click xem thêm các sản phẩm
  const handleViewMoreProducts = () => {
    dispatch({ type: "VIEWMOREPRODUCTS" });
  };

  //hàm xử lý lọc products
  const handleUpdateConditions = (conditions1, conditions2) => {
    dispatch({
      type: "UPDATEFILTERCONDITIONS",
      payload: {
        conditions1,
        conditions2,
      },
    });
  };

  //cập nhật laiij listProductsRender
  useEffect(() => {
    dispatch({
      type: "FILTERPRODUCTS",
    });
  }, [state.filterConditions, state.inputSearchData]);

  //hàm theo dõi giá trị của ô input data
  const handleChangeInputSearch = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEINPUTSEARCH",
      payload: {
        element,
      },
    });
  };

  return (
    <div className="products">
      <div className="title-36">Products</div>
      <div className="filter-bar">
        <div className="filter-by-options">
          {/* <div className="title-24">Filter</div> */}
          <div className="company item">
            <input type="checkbox" id="company" />
            <label htmlFor="company" className="box-title">
              <p className="desc">Company: </p>
              <p className="desc">
                {state.filterConditions.company.charAt(0).toUpperCase() +
                  state.filterConditions.company.slice(1)}
              </p>
            </label>

            <label htmlFor="company" className="overlay"></label>
            <div className="box-options">
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "all")}
              >
                All
              </label>
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "apple")}
              >
                Apple
              </label>
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "dell")}
              >
                Dell
              </label>
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "asus")}
              >
                Asus
              </label>
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "samsung")}
              >
                Samsung
              </label>
              <label
                htmlFor="company"
                className="desc"
                onClick={() => handleUpdateConditions("company", "logitech")}
              >
                Logitech
              </label>
            </div>
          </div>
          <div className="classify item">
            <input type="checkbox" id="classify" />
            <label htmlFor="classify" className="box-title">
              <p className="desc">Classify: </p>
              <p className="desc">
                {state.filterConditions.classify.charAt(0).toUpperCase() +
                  state.filterConditions.classify.slice(1)}
              </p>
            </label>
            <label htmlFor="classify" className="overlay"></label>
            <div className="box-options">
              <label
                htmlFor="classify"
                className="desc"
                onClick={() => handleUpdateConditions("classify", "all")}
              >
                All
              </label>
              <label
                htmlFor="classify"
                className="desc"
                onClick={() => handleUpdateConditions("classify", "mobile")}
              >
                Mobile
              </label>
              <label
                htmlFor="classify"
                className="desc"
                onClick={() => handleUpdateConditions("classify", "table")}
              >
                Tablet
              </label>
              <label
                htmlFor="classify"
                className="desc"
                onClick={() => handleUpdateConditions("classify", "laptop")}
              >
                Laptop
              </label>
              <label
                htmlFor="classify"
                className="desc"
                onClick={() => handleUpdateConditions("classify", "accessory")}
              >
                Accessory
              </label>
            </div>
          </div>
          <div className="sort item">
            <input type="checkbox" id="sort" />
            <label htmlFor="sort" className="box-title">
              <p className="desc">
                {`Sort${
                  state.filterConditions.sort
                    ? ": " +
                      state.filterConditions.sort.charAt(0).toUpperCase() +
                      state.filterConditions.sort.slice(1)
                    : ""
                }`}
              </p>
            </label>

            <label htmlFor="sort" className="overlay"></label>

            <div className="box-options">
              <label
                htmlFor="sort"
                className="box-desc"
                onClick={() => handleUpdateConditions("sort", "increase")}
              >
                <p className="desc">Prices increase</p>
                <div className="icon">
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
              </label>
              <label
                htmlFor="sort"
                className="box-desc"
                onClick={() => handleUpdateConditions("sort", "decrease")}
              >
                <p className="desc">Prices decrease</p>
                <div className="icon">
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </label>
              <label
                htmlFor="sort"
                className="desc"
                onClick={() => handleUpdateConditions("sort", "sale")}
              >
                On sale
              </label>
            </div>
          </div>
        </div>

        <div className="filter-by-search">
          <input
            type="text"
            placeholder="Search"
            onChange={handleChangeInputSearch}
            value={state.inputSearchData}
          />
        </div>
      </div>

      <div className="list-products">
        {state.listProductsData &&
          state.listProductsRender.map((product) => (
            <CartProduct
              key={product.idProduct}
              product={product}
            ></CartProduct>
          ))}
      </div>

      {state.quantityProductsRender < state.listFilteredProductsData.length && (
        <div className="box-btn">
          <button className="btn-dark-pink" onClick={handleViewMoreProducts}>
            {`View ${
              state.listFilteredProductsData.length -
              state.quantityProductsRender
            } more products`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
