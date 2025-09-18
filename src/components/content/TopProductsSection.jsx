import React, { useState } from "react";
import CardTopProduct from "../CardProduct";
import ModalCardTopProduct from "../ModalCardProduct";

const productData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    type: "necklace",
    price: 100,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    type: "rings",
    price: 65,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    type: "bracelets",
    price: 90,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-59_18c1dec3-e10e-466f-9f6d-0960696ecbbf.jpg?v=1714980909&width=600",
    discount: 0,
    rating: 4.5,
    titleProduct: "Pearl Earring",
    type: "earring",
    description:
      "5 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
    price: 78,
  },
  // {
  //   imgSrc:
  //     "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
  //   discount: 0,
  //   rating: 3,
  //   titleProduct: "Dainty Chain Bracelet",
  //   type: "bracelets",
  //   price: 80,
  // },
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
        className=" sm:px-30 md:px-20 flex flex-col justify-center items-center sm:grid sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {productData.map((product, index) => {
          return (
            <CardTopProduct
              key={index}
              imgSrc={product.imgSrc}
              discount={product.discount}
              titleProduct={product.titleProduct}
              price={product.price}
              type={product.type}
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
