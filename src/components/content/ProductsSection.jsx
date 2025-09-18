import React, { useState, useEffect } from "react";
import ProductTypeComponent from "../ProductTypeComponent";

// this page show all types product
const productTypeData = [
  {
    id: 1,
    type: "Necklace",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-7.jpg?crop=center&height=682&v=1730103840&width=629",
    sellAmount: 50,
    shopButton: {
      active: true,
      text: "Shop Now",
    },
  },
  {
    id: 2,
    type: "Bracelets",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-8.jpg?crop=center&height=333&v=1730102058&width=630",
    sellAmount: 40,
    shopButton: {
      active: true,
      text: "",
    },
  },
  {
    id: 3,
    type: "Earrings",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-10.jpg?crop=center&height=682&v=1730103841&width=629",
    sellAmount: 50,
    shopButton: {
      active: true,
      text: "Shop Now",
    },
  },
  {
    id: 4,
    type: "Rings",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-9.jpg?crop=center&height=333&v=1730102058&width=630",
    sellAmount: 35,
    shopButton: {
      active: true,
      text: "",
    },
  },
];
const ProductsSection = () => {
  const [sortSellerProduct, setSortSellerProduct] = useState([]);
  useEffect(() => {
    const sorted = productTypeData
      .sort((a, b) => b.sellAmount - a.sellAmount)
      .slice(0, productTypeData.length);
    setSortSellerProduct(sorted);
  }, []);

  return (
    <div
      id="products-container"
      className="py-20 w-full min-h-[80vh]  grid grid-cols-1 grid-rows-4 gap-0 xl:gap-2 sm:grid-cols-12  xl:grid-cols-12 xl:h-screen"
    >
      {sortSellerProduct.map((product, index) => {
        const base = "relative hover:cursor-pointer h-[50vh] xl:h-auto";
        const lg = "lg:row-span-4 lg:h-[80vh]";
        const xl =
          index === 0
            ? "xl:col-span-4 xl:row-span-4 xl:row-start-1 xl:col-start-1"
            : index === 1
            ? "xl:col-span-4 xl:row-span-4 xl:row-start-1 xl:col-start-9 "
            : "xl:col-span-4 xl:row-span-2";
        const sm = "sm:col-span-12 sm:h-[40vh]";
        const md = "md:col-span-12";

        return (
          <ProductTypeComponent
            key={index}
            imgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
            index={index}
            className={`${base} ${sm} ${md}  ${lg} ${xl} h-full`}
          />
        );
      })}
    </div>
  );
};

export default ProductsSection;
