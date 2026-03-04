import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SidebarProductsComponent from "../components/SidebarProductsComponent";
import SidebarMenu from "./sidebarProducts/SidebarMenu";
import CardProduct from "./CardProduct";
import TypeProducts from "./TypeProducts";
// import { useFilteredProducts } from "../contexts/filterProductsContext";
import { useFilteredProducts } from "../utility/context/filterProductsContext";
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

const ProductsComponent = memo(() => {
  const { productData, isLoading } = useFilteredProducts();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const receiveStatusFromSidebar = (status) => {
    setSidebarToggle(status);
  };
  const sidebarToggleHandler = () => {
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <div id="products=page" className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]">
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
            underline="hover"
            onClick={() => navigate("/")}
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
            Home
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
            Products
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="type-products-container">
        <TypeProducts pageType={"products"} />
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
      <div id="main-container" className="mt-5 lg:grid lg:gap-5 lg:grid-cols-10 ">
        <div id="sidebar-container" className="hidden lg:block lg:col-span-2">
          <SidebarMenu />
        </div>
        <div id="products-container" className="flex flex-col items-center lg:col-span-8">
          {isLoading ? (
            <div className="w-full flex justify-center items-center py-20">
              <span className="text-gray-400 text-sm animate-pulse">Loading products...</span>
            </div>
          ) : productData && productData.length > 0 ? (
            productData.map((product, index) => (
              <CardProduct
                key={product?._id || index}
                productId={product?._id}
                productImg={product.productImg}
                discount={product?.discount}
                rating={product?.rating}
                productName={product?.productName}
                description={product?.description}
                price={product?.price}
                type={product?.typeProduct}
                variants={product?.variants}
                isProductsPage={true}
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center py-20">
              <span className="text-gray-400 text-sm">No products found.</span>
            </div>
          )}
        </div>
      </div>
      <SidebarProductsComponent toggleSidebar={sidebarToggle} sendStatusToParent={receiveStatusFromSidebar} />
    </div>
  );
});

export default ProductsComponent;
