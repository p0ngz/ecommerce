import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SidebarProductsComponent from "../components/SidebarProductsComponent";
import { useFilteredProducts } from "../contexts/filterProductsContext";

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
const ProductsComponent = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const { filteredData } = useFilteredProducts();

  const receiveStatusFromSidebar = (status) => {
    setSidebarToggle(status);
  };
  const sidebarToggleHandler = () => {
    setSidebarToggle(!sidebarToggle);
  };
  useMemo(() => {
    console.log("filteredData in ProductsComponent: ", filteredData);
  }, [filteredData]);
  return (
    <div
      id="products=page"
      className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
    >
      <h2
        id="products-title"
        className="text-center mb-3 text-3xl lg:text-start"
      >
        Products
      </h2>
      <div
        id="products-breadcrumb"
        className="flex justify-center mb-10 lg:justify-start"
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            // styling separator
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
          >
            Home
          </Link>

          <Typography sx={{ color: "text.primary" }}>shipping</Typography>
        </Breadcrumbs>
      </div>
      <div
        id="filter-container"
        className="w-full mt-15 flex justify-center gap-3 md:justify-between md:px-3"
      >
        <div
          id="toggle-sidebar-btn"
          className="h-full border border-gray-300 p-2 rounded-sm hover:cursor-pointer hover:bg-gray-200 hover:border-gray-500"
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
      {/* <SidebarProductsComponent toggleSidebar={sidebarToggle} sendStatusToParent={receiveStatusFromSidebar()}/> */}
      <SidebarProductsComponent
        toggleSidebar={sidebarToggle}
        sendStatusToParent={receiveStatusFromSidebar}
      />
    </div>
  );
};

export default ProductsComponent;
