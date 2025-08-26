import React, { useState } from "react";
import CardTopProduct from "../CardProduct";
import ModalCardTopProduct from "../ModalCardProduct";

const productData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-59_18c1dec3-e10e-466f-9f6d-0960696ecbbf.jpg?v=1714980909&width=600",
    discount: 0,
    rating: 0,
    titleProduct: "Pearl Earrings",
    price: 76,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-57.jpg?v=1714980825&width=600",
    discount: 0,
    rating: "",
    titleProduct: "Open Rope Hoop Earrings",
    price: 70,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-59.jpg?v=1714980247&width=600",
    discount: 0,
    rating: "",
    titleProduct: "Mini Daily Hoop Earrings",
    price: 72,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-44.jpg?v=1714979980&width=600",
    discount: 7,
    rating: "",
    titleProduct: "Majestic Floral Cascade Earrings",
    price: 70,
  },
];
const TopProductsSection = () => {
  const [activeModel, setActiveModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const receiveData = (data) => {
    setDataModal(data.data);
    setActiveModal(data.open);
  };
  return (
    <div id="top-product-container" className="py-20 w-full min-h[10rem]">
      <div id="top-product-header" className="text-center">
        <h2 className="text-3xl capitalize">Top Trending</h2>
      </div>
      <div
        id="card-top-product-container"
        className="px-50 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {productData.map((product, index) => {
          return (
            <CardTopProduct
              key={index}
              imgSrc={product.imgSrc}
              discount={product.discount}
              titleProduct={product.titleProduct}
              price={product.price}
              viewState={true}
              sendDataToModal={receiveData}
            />
          );
        })}
      </div>
      {activeModel ? (
        <ModalCardTopProduct toggleState={activeModel} dataModal={dataModal} />
      ) : null}
    </div>
  );
};

export default TopProductsSection;
