import React, { useState, useEffect, memo, useCallback } from "react";
import CardTopProduct from "../CardProduct";
import ModalCardTopProduct from "../ModalCardProduct";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";
const TopProductsSection = memo(() => {
  const [activeModel, setActiveModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [topProduct, setTopProduct] = useState([]);
  const [color, setColor] = useState(null);

  const { getTopProducts } = useProductStore(
    useShallow((state) => {
      return {
        getTopProducts: state.getTopProducts,
      };
    })
  );
  const getTopProductsHandler = useCallback(
    async (limit) => {
      const products = await getTopProducts(limit);
      setTopProduct(() => products);
    },
    [getTopProducts]
  );
  const receiveData = (data) => {
    setDataModal(data.data);
    setActiveModal(data.open);
    setColor(data?.data?.chooseColor);
  };

  useEffect(() => {
    getTopProductsHandler(4);
  }, [getTopProductsHandler]);
  return (
    <div id="top-product-container" className="py-20 w-full min-h[10rem]">
      <div id="top-product-header" className="text-center">
        <h2 className="text-3xl capitalize">Top Trending</h2>
      </div>
      <div
        id="card-top-product-container"
        className=" sm:px-30 md:px-20 flex flex-col justify-center items-center sm:grid sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {topProduct.length > 0 &&
          topProduct.map((product, index) => {
            return (
              <CardTopProduct
                key={index}
                productId={product._id}
                productImg={product.productImg}
                discount={product.discount}
                productName={product.productName}
                description={product.description}
                price={product.price}
                type={product.typeProduct}
                variants={product.variants}
                viewState={true}
                sendDataToModal={receiveData}
              />
            );
          })}
      </div>
      {activeModel ? <ModalCardTopProduct toggleState={activeModel} dataModal={dataModal} colorProps={color} /> : null}
    </div>
  );
});

export default TopProductsSection;
