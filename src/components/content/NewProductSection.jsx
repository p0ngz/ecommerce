import React, { useState, useEffect } from "react";
import CardNewProduct from "../CardProduct";
import ModalCardProduct from "../ModalCardProduct";
const productData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    price: 100,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    price: 65,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    price: 90,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 0,
    rating: 3,
    titleProduct: "Dainty Chain Bracelet",
    price: 80,
  },
];

const NewProductSection = () => {
  const [activeModel, setActiveModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const receiveData = (data) => {
    setDataModal(data.data);
    setActiveModal(data.open);
  };
  useEffect(() => {
    console.log('activeModel: ', activeModel)
  }, [activeModel])
  return (
    <div
      id="new-product-container"
      className="py-20 w-full min-h-[10rem]"
    >
      <div id="new-product-header" className="text-center">
        <h2 className="text-5xl sm:text-3xl capitalize">New in</h2>
      </div>

      <div
        id="card-new-product-container"
        className=" sm:px-50 md:px-20 flex flex-col justify-center items-center sm:grid sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {/* we import CardComponent Here */}
        {productData.map((product, index) => {
          return (
            <CardNewProduct
              key={index}
              imgSrc={product.imgSrc}
              discount={product.discount}
              rating={product.rating}
              titleProduct={product.titleProduct}
              price={product.price}
              viewState={true}
              sendDataToModal={receiveData}
            />
          );
        })}
      </div>
      {
        activeModel ? <ModalCardProduct toggleState={activeModel} dataModal={dataModal}/> : null
      }
    </div>
  );
};

export default NewProductSection;
