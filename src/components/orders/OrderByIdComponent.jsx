import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import OrderList from "../profile/OrderList";
import ChipCard from "../../utility/components/ChipCard";
import LinearProgressbar from "../../utility/components/LinearProgressbar";
import { orderProcessArray } from "../../utility/OrderProcess";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { format } from "date-fns";
import { colorChipCardFromStatusOrder } from "../../utility/colorChipCard";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import OrderProcessCard from "./OrderProcessCard";
// import {
//     Inventory2SharpIcon, AccessTimeFilledSharpIcon, LocalShippingSharpIcon, CheckCircleOutlineSharpIcon
// } from '@mui/icons-material';

const OrderByIdComponent = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderByIdDetail } = useLocation().state;
  const {
    orderId: orderID,
    date,
    status,
    // order,
    trackingStatus,
    // shipping,
    // tax,
    // address,
    // trackingNumber,
  } = orderByIdDetail;

  // Style variable for consistent icon sizing
//   const orderProcessIconStyle = {
//     fontSize: {
//       xs: "large",
//       sm: "large",
//       md: "large",
//       lg: "large",
//       xl: "large",
//     },
//   };
  const formatDate = format(date, "MMMM d, yyyy");

  const backToPreviousHandler = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!orderByIdDetail) {
      navigate("/profile/orders");
    }
  }, []);
  return (
    <div id="order-component" className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]">
      <h2 id="orders-title" className="text-center mb-3 text-3xl lg:text-5xl">
        Orders
      </h2>
      <div id="orders-breadcrumb" className="flex justify-center mb-10">
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
            className="hover:"
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
            underline="hover"
            onClick={() => navigate("/profile")}
            className="hover:"
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
            Profile
          </Typography>
          <Typography
            underline="hover"
            onClick={() => navigate("/profile/orders")}
            className="hover:"
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
            Orders
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
              fontWeight: "bold",
            }}
          >
            {orderId}
          </Typography>
        </Breadcrumbs>
      </div>
      <div
        id="order-header-container"
        className="w-full h-full text-sm rounded-md border border-gray-300  p-5 relative"
      >
        <div id="order-header" className="flex items-center justify-start gap-3">
          <div id="back-to-previous" className="hover:cursor-pointer" onClick={() => backToPreviousHandler()}>
            <KeyboardBackspaceSharpIcon fontSIze="large" />
          </div>
          <div id="order-header-info">
            <h3 className="text-lg">
              Track Order: <span className="base ms-2">#{orderID}</span>
            </h3>
            <p className="base text-lg text-gray-400">Ordered on {formatDate}</p>
          </div>
        </div>
      </div>
      <div
        id="order-tracking-container"
        className="my-5 w-full h-full text-sm rounded-md border border-gray-300  p-5 relative"
      >
        <div id="order-tracking-header" className="flex justify-between items-center">
          <h3 className="text-lg">Order Status</h3>
          <ChipCard text={status} bgColor={colorChipCardFromStatusOrder(status)} textSize={"text-md"} />
        </div>
        <div id="order-tracking-bar" className="w-full my-6">
          <LinearProgressbar currentProcess={status} />
          <p className="base mt-2 text-lg text-gray-400">
            Step {orderProcessArray.indexOf(status) + 1} of {orderProcessArray.length}
          </p>
        </div>
        <div id="order-tracking-process" className="flex flex-col gap-4">
          {/* <div id="ordered-placed" className="flex flex-start items-center gap-3">
            <div id="ordered-placed-icon" className="p-3 rounded-full bg-gray-200">
              <Inventory2SharpIcon sx={orderProcessIconStyle} />
            </div>
            <div className="flex flex-col justify-start">
              <h3 id="order-id" className="base text-lg font-semibold ">
                Order Placed
              </h3>
              <span className="base text-gray-400">
                {format(date, "MMM dd, yyyy")} ~ {order.count} items
              </span>
            </div>
          </div>
          <div id="processing" className="flex flex-start items-center gap-3 mt-4">
            <div id="processing-icon" className="p-3 rounded-full bg-gray-200">
              <AccessTimeFilledSharpIcon sx={orderProcessIconStyle} />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="base text-lg font-semibold">Processing</h3>
              <span className="base text-gray-400">Order is being prepared</span>
            </div>
          </div>

          <div id="shipped" className="flex flex-start items-center gap-3 mt-4">
            <div id="shipped-icon" className="p-3 rounded-full bg-gray-200">
              <LocalShippingSharpIcon sx={orderProcessIconStyle} />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="base text-lg font-semibold">Shipped</h3>
              <span className="base text-gray-400">Package is on the way</span>
            </div>
          </div>

          <div id="delivered" className="flex flex-start items-center gap-3 mt-4">
            <div id="delivered-icon" className="p-3 rounded-full bg-gray-200">
              <CheckCircleOutlineSharpIcon sx={orderProcessIconStyle} />
            </div>
            <div className="flex flex-col justify-start">
              <h3 className="base text-lg font-semibold">Delivered</h3>
              <span className="base text-gray-400">Package delivered successfully</span>
            </div>
          </div> */}
          {orderProcessArray.map((processStatus, index) => {
            const matchStatusInTracking = trackingStatus.statusHistory.find((item) => item.status === processStatus);
            const lastStatusInTracking = trackingStatus.statusHistory.at(-1);

            if (matchStatusInTracking && matchStatusInTracking.status === trackingStatus.currentStatus) {
              const formatDate = format(matchStatusInTracking.date, "MMM d, yyyy");
              //   console.log("case 1: ", processStatus);
              return <OrderProcessCard key={index} status={processStatus} completeDate={formatDate} isCurrent={true} />;
            } else if (matchStatusInTracking && matchStatusInTracking.status !== lastStatusInTracking.status) {
              //   console.log("case 2: ", processStatus);
              const formatDate = format(matchStatusInTracking.date, "MMM d, yyyy");
              return <OrderProcessCard key={index} status={processStatus} completeDate={formatDate} isPast={true} />;
            } else {
              //   console.log("case 3: ", processStatus);
              return <OrderProcessCard key={index} status={processStatus} isComing={true} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderByIdComponent;
