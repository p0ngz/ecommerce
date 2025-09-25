import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ChipCard from "../../utility/components/ChipCard";
import LinearProgressbar from "../../utility/components/LinearProgressbar";
import { orderProcessArray } from "../../utility/OrderProcess";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { format } from "date-fns";
import { colorChipCardFromStatusOrder } from "../../utility/colorChipCard";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import OrderProcessCard from "./OrderProcessCard";
import OrderList from "../profile/OrderList";

const OrderByIdComponent = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderByIdDetail } = useLocation().state;
  const {
    orderId: orderID,
    date,
    status,
    order,
    trackingStatus,
    shipping,
    tax,
    address,
    trackingNumber,
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
  const findCurrentStatusDate = (curStatus, type) => {
    const currentStatus = curStatus;

    if (!trackingStatus || !trackingStatus.statusHistory || !Array.isArray(trackingStatus.statusHistory)) {
      return null;
    }
    const currentStatusInfo = trackingStatus.statusHistory.find((statusItem) => statusItem.status === currentStatus);
    if (!currentStatusInfo) {
      return null;
    }
    const currentDateObj = new Date(currentStatusInfo.date);
    if (type === "date") {
      const formatDate = format(currentDateObj, "MMM dd, yyyy");
      return formatDate;
    } else if (type === "dateTime") {
      const formateDateTime = format(currentDateObj, "MMM dd, yyyy, HH:mm:ss");
      return formateDateTime;
    }
  };
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
            underline="hover"
            onClick={() => navigate("/profile")}
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
            Profile
          </Typography>
          <Typography
            underline="hover"
            onClick={() => navigate("/profile/orders")}
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
        <div id="order-items" className="mb-10 p-3 border border-gray-200 rounded-sm">
          <h2 className="mb-5 text-lg font-semibold">Order Items</h2>
          {order.items.map((item, index) => {
            return (
              <div id="order-items-list" className="flex justify-between items-center mb-3" key={index}>
                <div id="left" className="flex gap-3 items-start">
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1719427129638-3058a01c3a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc2hvcHBpbmclMjBpdGVtc3xlbnwxfHx8fDE3NTg1NDc3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt=""
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                  <div id="order-item-list-info" className="flex-1 gap-2">
                    <h3 className="base text-md font-semibold">{item.name}</h3>
                    <p className="base text-sm text-gray-400">{item.productId}</p>
                    <p className="base text-sm text-gray-400">
                      Quantity: {item.quantity} * ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div id="right" className="flex-shrink-0">
                  <span className="base font-semibold">${item.quantity * item.price.toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div id="order-summary" className="mb-10 p-3 border border-gray-200 rounded-sm">
          <h2 className="mb-5 text-lg font-semibold">Order Summary</h2>
          <div id="order-summary-container" className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="base">Subtotal</span>
              <span className="base">${order.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="base">Shipping</span>
              <span className="base">${shipping}</span>
            </div>
            <div className="flex justify-between">
              <span className="base">Tax</span>
              <span className="base">${tax}</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <span className="base font-semibold">Total</span>
            <span className="base font-semibold">${(order.total * tax + shipping).toFixed(2)}</span>
          </div>
        </div>
        <div id="shipping info" className="mb-10 p-3 border border-gray-200 rounded-sm">
          <h2 className="mb-5 text-lg font-semibold">Shipping Information</h2>
          <div id="shipping-information-container">
            <div id="delivered-address">
              <h3 className="base text-md font-semibold">Delivery Address</h3>
              <p className="base text-gray-400">{address}</p>
            </div>
            {findCurrentStatusDate(status, "date") && (
              <div id="current-status">
                <h3 className="base text-md font-semibold">{status}</h3>
                <p className="base text-gray-400">{findCurrentStatusDate(status, "date")}</p>
              </div>
            )}
            <div id="tracking-number" className="mt-3">
              <h3 className="base text-md font-semibold">Tracking Number</h3>
              <p className="base text-gray-400">{trackingNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderByIdComponent;
