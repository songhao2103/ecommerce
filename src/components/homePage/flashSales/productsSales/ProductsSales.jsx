import CartProduct from "../../../../commonComponent/cartProduct/CartProduct";

const ProductsSales = ({
  listProductsSaleElement,
  listProductSales,
  boxListElement,
}) => {
  return (
    <div className="box-products-sale">
      <div className="box-list" ref={boxListElement}>
        <div className="list-products-sale" ref={listProductsSaleElement}>
          {listProductSales.map((product) => (
            <CartProduct
              product={product}
              key={product.idProduct}
            ></CartProduct>
          ))}
        </div>
      </div>

      <div className="box-btn">
        <div className="btn-dark-pink desc">View All Products</div>
      </div>
    </div>
  );
};

export default ProductsSales;
