import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalizeHandler } from "../utility/capitalizeHandler";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import CardNewProduct from "./CardProduct";

const topRateProductData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    type: "necklace",
    description:
      "1 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 100,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    type: "rings",
    description:
      "2 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 65,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    type: "bracelets",
    description:
      "3 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

    price: 90,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 0,
    rating: 3,
    titleProduct: "Dainty Chain Bracelet",
    type: "bracelets",
    description:
      "4 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

    price: 80,
  },
];
const relateProductData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    type: "necklace",
    description:
      "1 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 100,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    type: "rings",
    description:
      "2 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 65,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    type: "bracelets",
    description:
      "3 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

    price: 90,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 0,
    rating: 3,
    titleProduct: "Dainty Chain Bracelet",
    type: "bracelets",
    description:
      "4 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

    price: 80,
  },

];

const TopRateProductElement = ({ imgSrc, titleProduct, price }) => {
  return (
    <div className="grid grid-cols-2 mb-5 gap-4">
      <img src={imgSrc} alt="" className="w-full h-full" />
      <div className="flex flex-col justify-center">
        <h3>{titleProduct}</h3>
        <p>${price}</p>
      </div>
    </div>
  );
};
const ProductComponent = () => {
  const product = useSelector((state) => state.Product.product);
  const navigate = useNavigate();
  const { typeProduct, productName } = useParams();
  const [type, setType] = useState("");
  const [realProductName, setRealProductName] = useState("");

  useEffect(() => {
    const removeDash = productName.split("-").join(" ");
    const name = capitalizeHandler(removeDash);
    setRealProductName(name);
  }, [productName]);
  useEffect(() => {
    const type = capitalizeHandler(typeProduct);
    setType(type);
  }, [typeProduct]);
  useEffect(() => {
    console.log("product: ", product);
  }, [product]);
  return (
    <div
      id="products-page"
      className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
    >
      <h2 id="products-title" className="text-center mb-3 text-3xl lg:text-5xl">
        {realProductName}
      </h2>
      <div id="product-breadcrumbs" className="flex justify-center mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          i
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Typography
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate("/")}
            color="inherit"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "rem",
                lg: "1.2rem",
              },
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Home
          </Typography>

          <Typography
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate("/products")}
            color="inherit"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "rem",
                lg: "1.2rem",
              },
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Products
          </Typography>
          <Typography
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate(`/products/${typeProduct}`)}
            color="inherit"
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "rem",
                lg: "1.2rem",
              },
              "&:hover": {
                color: "text.primary",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            {type}
          </Typography>
          <Typography
            className="hover:cursor-pointer"
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              fontSize: {
                xs: "0.7rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
            }}
          >
            {realProductName}
          </Typography>
        </Breadcrumbs>
      </div>
      <div
        id="main-content"
        className=" lg:grid lg:grid-cols-12 lg:grid-rows-[60vh] lg:gap-10 "
      >
        <div
          id="top-rate-product"
          className="hidden lg:block lg:col-span-3 lg:max-h-[50vh]"
        >
          <h3 className="text-2xl mb-5">Top Rate Product</h3>
          <div
            id="top-rate-product-container"
            className="max-h-[50vh] overflow-y-scroll scrollbar-custom scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {topRateProductData.map((item, index) => {
              return (
                <TopRateProductElement
                  key={index}
                  imgSrc={item.imgSrc}
                  titleProduct={item.titleProduct}
                  price={item.price}
                />
              );
            })}
          </div>
        </div>
        <div id="main-product" className="flex justify-center lg:col-span-9">
          <CardNewProduct
            key={product.titleProduct}
            imgSrc={product.imgSrc}
            discount={product.discount}
            rating={product.rating}
            titleProduct={product.titleProduct}
            price={product.price}
            type={product.type}
            description={product.description}
            isProductPage={true}
          />
        </div>
        {/* <div id="review" className="col-span-10"></div> */}
        <div
          id="relate-product"
          className="mt-15 col-span-12 flex flex-col justify-center"
        >
          <h2
            id="products-title"
            className="mb-10 text-center text-3xl lg:text-5xl"
          >
            Related Products
          </h2>
          <div
            id="relate-product-container"
            className=" px-5 md:px-10 flex grid grid-cols-2   xl:grid-cols-4 gap-5 px-5 py-10"
          >
            {relateProductData &&
              relateProductData.map((item, index) => {
                return (
                  <CardNewProduct
                    key={index}
                    imgSrc={item.imgSrc}
                    discount={item.discount}
                    rating={item.rating}
                    titleProduct={item.titleProduct}
                    price={item.price}
                    type={item.type}
                    viewState={true}
                    isRelateProduct={true}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
