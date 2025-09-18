import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SidebarProductsComponent from "./SidebarProductsComponent";
import SidebarMenu from "./sidebarProducts/SidebarMenu";
import CardProduct from "./CardProduct";
import TypeProducts from "./TypeProducts";
import { capitalizeHandler } from "../utility/capitalizeHandler";

const filterProduct = [
  {
    value: "featured",
    label: "FEATURED",
  },
  {
    value: "best-selling",
    label: "BEST SELLING",
  },
  {
    value: "alphabetically-a-z",
    label: "A-Z",
  },
  {
    value: "alphabetically-z-a",
    label: "Z-A",
  },
  {
    value: "price-low-high",
    label: "PRICE, LOW-HIGH",
  },
  {
    value: "price-high-low",
    label: "PRICE, HIGH-LOW",
  },
  {
    value: "date new-old",
    label: "DATE, NEW-OLD",
  },
  {
    value: "date old-new",
    label: "DATE, OLD-NEW",
  },
];
const productData = [
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
];
const TypeProductsComponent = () => {
  const { typeProduct } = useParams();
  const navigate = useNavigate();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [type, setType] = useState("");
  const productTypeRef = useRef(null);
  const receiveStatusFromSidebar = (status) => {
    setSidebarToggle(status);
  };
  const sidebarToggleHandler = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const navigateToProductHandler = (productType, productName) => {
    const urlNavigate = productName.toLowerCase();
    navigate(`/products/${productType}/${urlNavigate}`);
  };
  useEffect(() => {
    const type = capitalizeHandler(typeProduct);
    setType(type);
  }, [typeProduct]);
  useEffect(() => {
    if(productTypeRef.current) {
      productTypeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  })
  return (
    <div
      id="products-type-page"
      className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
      ref={productTypeRef}
    >
      <h2 id="products-title" className="text-center mb-3 text-3xl lg:text-5xl">
        Products
      </h2>
      <div id="products-breadcrumb" className="flex justify-center mb-10">
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
            color="inherit"
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
            sx={{
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
            underline="hover"
            onClick={() => navigate("/products")}
            className="hover:cursor-pointer"
            color="inherit"
            sx={{
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
            sx={{
              color: "text.primary",
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
            }}
          >
            {type}
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="type-products-container">
        <TypeProducts
          pageType={"products"}
          currentPage={type}
        />
      </div>
      <div
        id="filter-container"
        className="w-full mt-15 flex justify-center gap-3 md:justify-between lg:justify-center md:px-3"
      >
        <div
          id="toggle-sidebar-btn"
          className="lg:hidden h-full border border-gray-300 p-2 rounded-sm hover:cursor-pointer hover:bg-gray-200 hover:border-gray-500"
          onClick={() => sidebarToggleHandler()}
        >
          <TuneIcon />
        </div>
        <div id="filter-products-btn" className="h-full">
          <TextField
            id="outlined-select-currency"
            size="small"
            select
            label=""
            defaultValue="alphabetically-a-z"
            sx={{
              width: {
                xs: "10rem",
                sm: "10rem",
                md: "15rem",
                lg: "18rem",
                xl: "15rem",
              },
              height: "40px",
              "& .muliInputBase-root": {
                height: "100%",
              },
            }}
          >
            {filterProduct.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div
        id="main-container"
        className="mt-5 lg:grid lg:gap-5 lg:grid-cols-10"
      >
        <div id="sidebar-container" className="hidden lg:block lg:col-span-2">
          <SidebarMenu />
        </div>
        <div
          id="products-container"
          className="flex flex-col items-center lg:col-span-8"
        >
          {productData &&
            productData.map((product, index) => {
              return (
                <CardProduct
                  key={index}
                  imgSrc={product.imgSrc}
                  discount={product.discount}
                  rating={product.rating}
                  titleProduct={product.titleProduct}
                  price={product.price}
                  type={product.type}
                  isProductsPage={true}
                  description={product.description}
                  onClick={() =>
                    navigateToProductHandler(product.type, product.titleProduct)
                  }
                />
              );
            })}
        </div>
      </div>
      <SidebarProductsComponent
        toggleSidebar={sidebarToggle}
        sendStatusToParent={receiveStatusFromSidebar}
      />
    </div>
  );
};

export default TypeProductsComponent;
