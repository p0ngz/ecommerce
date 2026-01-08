import React, { useState, useEffect, memo, useCallback } from "react";
import CardNewProduct from "../CardProduct";
import ModalCardProduct from "../ModalCardProduct";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";

// const productData = [
//   {
//     imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
//     discount: 40,
//     rating: 5,
//     titleProduct: "Apollop Coin Necklace",
//     type: "necklace",
//     price: 100,
//   },
//   {
//     imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
//     discount: 0,
//     rating: 4,
//     titleProduct: "Butterfly Ring",
//     type: "rings",
//     price: 65,
//   },
//   {
//     imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
//     discount: 20,
//     rating: 4.5,
//     titleProduct: "Cuban Link Chain Bracelet",
//     type: "bracelets",
//     price: 90,
//   },
//   {
//     imgSrc:
//       "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-59_18c1dec3-e10e-466f-9f6d-0960696ecbbf.jpg?v=1714980909&width=600",
//     discount: 0,
//     rating: 4.5,
//     titleProduct: "Pearl Earring",
//     type: "earring",
//     description:
//       "5 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec est imperdiet, a malesuada sem rutrum",
//     price: 78,
//   },
//   // {
//   //   imgSrc:
//   //     "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
//   //   discount: 0,
//   //   rating: 3,
//   //   titleProduct: "Dainty Chain Bracelet",
//   //   type: "bracelets",
//   //   price: 80,
//   // },
// ];

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
  const getNewestProductsHandler = useCallback(async () => {
    const response = await getNewestProducts(4);
    const products = response?.data
    setNewestProduct(() => products);
  }, [getNewestProducts]);
  useEffect(() => {
    getNewestProductsHandler();
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
                imgSrc={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${product.productImg}`}
                discount={product.discount}
                rating={product.rating}
                titleProduct={product.productName}
                price={product.price}
                type={product.typeProduct}
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
