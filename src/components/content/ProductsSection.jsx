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
      active: false,
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
    type: "Ring",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-9.jpg?crop=center&height=333&v=1730102058&width=630",
    sellAmount: 35,
    shopButton: {
      active: false,
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
  //   useEffect(() => {
  //     if (sortSellerProduct.length > 0) {
  //       console.log("sortSellerProduct changed: ", sortSellerProduct);
  //     }
  //   }, [sortSellerProduct]);
  return (
    // using grid to layout it
    // i want to dynamic stye grid with top 1, 2 from type that most seller
    <div
      id="products-container"
      className="py-20 w-full min-h-[80vh]  grid grid-cols-12 grid-rows-4 gap-5 md:grid-cols-1 md:grid-rows-none sm:grid-cols-1 sm:grid-rows-none sm:gap-0 xl:gap-3 lg:gap-3"
    >
      {/* {sortSellerProduct.map((product, index) => {
        index === 1 ? (
          <ProductTypeComponent
            className="col-span-4 row-span-4 bg-slate-700 row-start-1 col-start-1"
            imgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
          />
        ) : index === 2 ? (
          <ProductTypeComponent
            className="col-span-4 row-span-4 bg-slate-700 row-start-1 col-start-9"
            mgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
          />
        ) : (
          <ProductTypeComponent
            className="col-span-4 row-span-2 bg-slate-700"
            mgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
          />
        );
      })} */}
      {/* {sortSellerProduct.map((product, index) => {
        return (
          <ProductTypeComponent
            key={index}
            imgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
            index={index}
            className={`relative col-span-4 row-span-${
              (index === 0) | (index === 1) ? 4 : 2
            } ${
              index === 0
                ? "row-start-1 col-start-1"
                : index === 1
                ? "row-start-1 col-start-9"
                : ""
            } hover:cursor-pointer `}
          />
        );
      })} */}
      {sortSellerProduct.map((product, index) => {
        // For xl: custom grid, for md and below: col-span-12, row-span-1, no manual placement
        const base = "relative hover:cursor-pointer";
        const xl =
          index === 0
            ? "xl:col-span-4 xl:row-span-4 xl:row-start-1 xl:col-start-1"
            : index === 1
            ? "xl:col-span-4 xl:row-span-4 xl:row-start-1 xl:col-start-9 "
            : "xl:col-span-4 xl:row-span-2";
        const sm = "md:col-span-12 md:row-span-1 md:row-auto md:col-auto"
        const md = "md:col-span-12 md:row-span-1 md:row-auto md:col-auto";

        return (
          <ProductTypeComponent
            key={index}
            imgSrc={product.imgSrc}
            typeProduct={product.type}
            shopButton={product.shopButton}
            index={index}
            className={`${base} ${xl} ${md} ${sm}`}
          />
        );
      })}
      {/* <div className="col-span-4 row-span-4 bg-slate-700 row-start-1 col-start-1">
        1
      </div>

      <div className="col-span-4 row-span-4 bg-slate-700 row-start-1 col-start-9">
        4
      </div>
      <div className="col-span-4 row-span-2 bg-slate-700">2</div>
      <div className="col-span-4 row-span-2 bg-slate-700">3</div> */}
    </div>
  );
};

export default ProductsSection;
