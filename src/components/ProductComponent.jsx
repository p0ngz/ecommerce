import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { capitalizeHandler } from "../utility/capitalizeHandler";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import CardProduct from "./CardProduct";
// import CardBreadcrumb from "./CardBreadcrumb";
import { useProductStore } from "../store/product/productStore";
import { useShallow } from "zustand/shallow";

// const relateProductData = [
//   {
//     productImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
//     discount: 40,
//     rating: 5,
//     titleProduct: "Apollop Coin Necklace",
//     type: "necklace",
//     description:
//       "1 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
//     price: 100,
//   },
//   {
//     productImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
//     discount: 0,
//     rating: 4,
//     titleProduct: "Butterfly Ring",
//     type: "rings",
//     description:
//       "2 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
//     price: 65,
//   },
//   {
//     productImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
//     discount: 20,
//     rating: 4.5,
//     titleProduct: "Cuban Link Chain Bracelet",
//     type: "bracelets",
//     description:
//       "3 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

//     price: 90,
//   },
//   {
//     productImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
//     discount: 0,
//     rating: 3,
//     titleProduct: "Dainty Chain Bracelet",
//     type: "bracelets",
//     description:
//       "4 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

//     price: 80,
//   },
//   {
//     productImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
//     discount: 0,
//     rating: 3,
//     titleProduct: "Dainty Chain Bracelet",
//     type: "bracelets",
//     description:
//       "4 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

//     price: 80,
//   },
// ];

const TopRateProductElement = ({ productId, imgSrc, titleProduct, price }) => {
  console.log("productId: ", productId);
  return (
    <div className="grid grid-cols-2 mb-5 gap-4" onClick={() => goToProduct()}>
      <img src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${imgSrc}`} alt="" className="w-full h-full" />
      <div className="flex flex-col justify-center">
        <h3>{titleProduct}</h3>
        <p className="number">${price}</p>
      </div>
    </div>
  );
};
const ProductComponent = () => {
  const product = useSelector((state) => state.Product?.product);
  const [topRateProductData, setTopRateProductData] = useState([]);
  const [relateProductData, setRelateProductData] = useState([]);
  const navigate = useNavigate();
  const { typeProduct, productName } = useParams();
  const [type, setType] = useState("");
  const [realProductName, setRealProductName] = useState("");
  const productPageRef = useRef(null);
  const { getTopRatingProducts, getRelateProduct } = useProductStore(
    useShallow((state) => ({
      getTopRatingProducts: state.getTopRatingProducts,
      getRelateProduct: state.getRelateProduct,
    }))
  );
  const getTopRatingProductsHandler = async () => {
    const topProducts = await getTopRatingProducts();
    setTopRateProductData(topProducts);
  };
  const getRelateProductHandler = async () => {
    const productId = product?.productID;
    const relateProducts = await getRelateProduct(productId);
    console.log("relateProducts: ", relateProducts);
    setRelateProductData(relateProducts);
  };
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
    if (productPageRef.current) {
      productPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    getTopRatingProductsHandler();
    getRelateProductHandler();
  }, []);
  return (
    <div id="products-page" className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]" ref={productPageRef}>
      <h2 id="products-title" className="text-center mb-3 text-3xl lg:text-5xl">
        {realProductName}
      </h2>
      <div id="product-breadcrumbs" className="flex justify-center mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
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
      <div id="main-content" className=" lg:grid lg:grid-cols-12 lg:grid-rows-[60vh] lg:gap-10 ">
        <div id="top-rate-product" className="hidden lg:block lg:col-span-3 lg:max-h-[50vh] ">
          <h3 className="text-2xl mb-5">Top Rate Product</h3>
          <div
            id="top-rate-product-container"
            className="max-h-[50vh] overflow-y-scroll scrollbar-custom scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            {topRateProductData.map((product, index) => {
              return (
                <TopRateProductElement
                  key={index}
                  productOd={product.productId}
                  imgSrc={product.productImg}
                  titleProduct={product.productName}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
        <div id="main-product" className="flex justify-center lg:col-span-9">
          <CardProduct
            key={product.productID}
            productId={product.productID}
            productImg={product.productImg}
            discount={product.discount}
            rating={product.rating}
            productName={product.productName}
            price={product.price}
            type={product.type}
            description={product.description}
            isProductPage={true}
          />
        </div>
        {/* <div id="review" className="col-span-10"></div> */}
      </div>
      {/* <div id="relate-product" className="mt-15 flex flex-col justify-center">
        <h2 id="products-title" className="mb-10 text-center text-3xl lg:text-5xl">
          Related Products
        </h2>
        <div id="relate-product-container" className="w-screnn flex justify-center">
          <CardBreadcrumb relatedProducts={relateProductData} isRelateProduct={true} />
        </div>
      </div> */}
    </div>
  );
};

export default ProductComponent;
