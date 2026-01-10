import React, { useState, useEffect, memo, useCallback } from "react";
import CardNewProduct from "../CardProduct";
import ModalCardProduct from "../ModalCardProduct";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";

const NewProductSection = memo(() => {
  const [activeModel, setActiveModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [newestProduct, setNewestProduct] = useState([]);
  const { getNewestProducts } = useProductStore(
    useShallow((state) => {
      return {
        getNewestProducts: state.getNewestProducts,
      };
    })
  );
  const receiveData = (data) => {
    setDataModal(data.data);
    setActiveModal(data.open);
  };
  const getNewestProductsHandler = useCallback(
    async (limit) => {
      const response = await getNewestProducts(limit);
      const products = response?.data;
      setNewestProduct(() => products);
    },
    [getNewestProducts]
  );
  useEffect(() => {
    getNewestProductsHandler(4);
  }, [getNewestProductsHandler]);
  return (
    <div id="new-product-container" className="py-20 w-full min-h-[10rem]">
      <div id="new-product-header" className="text-center">
        <h2 className="text-5xl sm:text-3xl capitalize">New in</h2>
      </div>

      <div
        id="card-new-product-container"
        className=" sm:px-30 md:px-20 flex flex-col justify-center items-center sm:grid sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {/* we import CardComponent Here */}
        {newestProduct.length > 0 &&
          newestProduct.map((product, index) => {
            return (
              <CardNewProduct
                key={index}
                productId={product._id}
                productImg={product.productImg}
                discount={product.discount}
                rating={product.rating}
                titleProduct={product.productName}
                price={product.price}
                type={product.typeProduct}
                variants={product.variants}
                viewState={true}
                sendDataToModal={receiveData}
              />
            );
          })}
      </div>
      {activeModel ? <ModalCardProduct toggleState={activeModel} dataModal={dataModal} /> : null}
    </div>
  );
});

export default NewProductSection;
