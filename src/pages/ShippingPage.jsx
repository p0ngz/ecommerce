import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ShippingTable from "../components/shippingTable/ShippingTable";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SummaryBill from "../components/SummaryBill";
import { ShippingProvider } from "../contexts/shippingContext";

const ShippingPage = () => {
  return (
    <ShippingProvider>
      <div
        id="shipping=page"
        className="px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
      >
        <h2 id="shipping-title" className="mb-3 text-3xl">
          Shipping Cart
        </h2>
        <div id="shipping-breadcrumb" className="mb-10">
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
          id="shipping-container"
          className="w-full h-full grid grid-cols-1 sm:grid-cols-8 md:grid-col-8 xl:grid-col-8 lg:grid-col-8gap-5 "
        >
          <div
            id="left-shipping-container"
            className="sm:col-span-8 md:col-span-8 lg:col-span-5"
          >
            <ShippingTable />
            <div id="instruction" className="my-15">
              <p className="text-sm">Special instructions for seller</p>
              <Box sx={{ width: "100%", height: "100px" }}>
                <TextField fullWidth id="fullWidth" multiline minRows={4} />
              </Box>
            </div>
          </div>
          <div
            id="right-shipping-container"
            className="px-5 h-auto sm:col-span-8 md:col-span-8 lg:col-span-3"
          >
            {/* #939393 */}
            <div
              id="promotion"
              className="mb-10 p-10 w-full h-auto  bg-[#f7f4ef]"
            >
              <p className="mb-5 flex items-center">
                <TipsAndUpdatesIcon className="me-3 text-yellow-300" />
                Free shipping on orders $100.00 Congratulations , you've got
                free shipping!
              </p>
              <div
                id="promotion-bar"
                className="w-full bg-lime-200 rounded-full h-1.5 dark:bg-gray-700"
              >
                <div className="w-full bg-lime-600 h-1.5 rounded-full"></div>
              </div>
            </div>
            <SummaryBill />
          </div>
        </div>
      </div>
    </ShippingProvider>
  );
};

export default ShippingPage;
