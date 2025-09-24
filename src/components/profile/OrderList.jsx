import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChipCard from "../../utility/components/ChipCard";
import { colorChipCardFromStatusOrder } from "../../utility/colorChipCard";
import { format } from "date-fns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const styleOrderProcessIcon = { fontSize: { xs: "medium", md: "medium", lg: "large" } };
const OrderList = ({ orderInfo, OrderPage = true }) => {
  const { orderId, date, status, order, trackingStatus, shipping, tax, address, trackingNumber } = orderInfo;

  const [isCancel, setIsCancel] = useState(trackingStatus?.cancel || false);
  const [isView, setIsView] = useState(false);
  const [inComingStatus, setInComingStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState(trackingStatus?.currentStatus);
  const navigate = useNavigate();
  const viewOrderHandler = () => {
    setIsView((prev) => !prev);
  };
  const cancelOrderHandler = () => {
    setIsCancel(true);
    setCurrentStatus("Cancelled");
  };
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
  const goToOrderHandler = (id) => {
    const orderByIdDetail = { ...orderInfo };
    console.log("orderByIdDetail: ", orderByIdDetail);
    navigate(`/profile/orders/${id}`, { state: { orderByIdDetail } });
  };
  useEffect(() => {
    const statusOrderCycle = ["OrderPlaced", "Pending", "Processing", "Shipped", "Delivered"];
    const currentStatusIndex = statusOrderCycle.indexOf(trackingStatus?.currentStatus);
    if (currentStatusIndex !== -1) {
      setInComingStatus(statusOrderCycle[currentStatusIndex + 1] || "");
    }
  }, [trackingStatus]);
  useEffect(() => {}, [isCancel]);
  return (
    <div id="order-list" className="w-full h-full text-sm rounded-md border border-gray-300  p-5 relative">
      {!trackingStatus?.cancel &&
        trackingStatus?.currentStatus !== "Delivered" &&
        trackingStatus?.currentStatus !== "Cancelled" && (
          <button
            className="min-w-8 h-auto p-1 absolute top-3 right-5 bg-red-300 text-white rounded-sm hover:cursor-pointer hover:bg-red-500"
            onClick={() => cancelOrderHandler()}
          >
            <DeleteForeverIcon fontSize="small" />
          </button>
        )}

      <div id="before-view" className="flex flex-col justify-center items-center gap-3">
        <div id="order-id-container" className="flex justify-start items-center gap-3 w-full">
          <div className="w-auto h-auto p-2 rounded-full bg-gray-200 flex justify-center items-center">
            <InventoryIcon fontSize="small" />
          </div>
          <div id="order-id-detail" className="flex flex-col justify-start">
            <span id="order-id" className="base  font-semibold">
              #{orderId}
            </span>
            <span className="base text-gray-400">
              {format(date, "MMM dd, yyyy")} ~ {order.count} items
            </span>
          </div>
        </div>
        <div id="order-info-container" className="w-full flex justify-between">
          <div id="price-status" className="flex gap-2 justify-start  items-center">
            <span id="total" className="base font-semibold ">
              ${order.total}
            </span>
            <ChipCard
              text={currentStatus}
              bgColor={colorChipCardFromStatusOrder(currentStatus)}
              txtColor={colorChipCardFromStatusOrder(currentStatus)}
            />
          </div>
          <button
            id="view"
            className="min-w-10 h-auto px-3 py-1 border border-gray-300 rounded-sm hover:cursor-pointer hover:bg-gray-100 transition"
            onClick={() => viewOrderHandler()}
          >
            {isView ? "Viewing" : "View"}
          </button>
        </div>
        {OrderPage && (
          <div id="tracking-container" className="w-full h-full mt-3">
            <button
              id="tracking-btn"
              className="w-full rounded-md py-2 bg-gray-900 text-gray-100 text-center sm:hover:cursor-pointer"
              onClick={() => goToOrderHandler(orderId)}
            >
              Tracking
            </button>
          </div>
        )}
      </div>

      {isView && (
        <div id="order-view-container" className="w-full mt-3 p-3 border border-gray-300 rounded-sm">
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

          <div id="order-timeline" className="mb-10 p-3 border border-gray-200 rounded-sm">
            <h2 className="mb-5 text-lg font-semibold">Order Timeline</h2>

            {trackingStatus?.statusHistory.map((statusItem, index) => {
              return (
                // complete
                <div
                  id="complete-progress-order"
                  className={`flex justify-start items-center gap-3 ${isCancel ? "line-through" : ""}`}
                  key={index}
                >
                  <div
                    id="icon-progress-order"
                    className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center"
                  >
                    {isCancel ? (
                      <CancelIcon className="w-full h-full text-red-500" />
                    ) : (
                      <CheckCircleIcon className="w-full h-full text-green-500" />
                    )}
                  </div>
                  <div id="complete-progress-info" className="">
                    <h3 className="base text-md font-semibold">{statusItem.status}</h3>
                    <p className="base text-gray-400">{findCurrentStatusDate(statusItem.status, "dateTime")}</p>
                  </div>
                </div>
              );
            })}
            {inComingStatus && !isCancel && (
              <div
                id="incoming-progress-order"
                className={`flex justify-start items-center gap-3 ${isCancel ? "line-through" : ""}`}
              >
                <div
                  id="icon-progress-order"
                  className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center"
                >
                  {isCancel ? (
                    <CancelIcon className="w-full h-full text-red-500" />
                  ) : (
                    <PendingIcon className="w-full h-full text-gray-500" />
                  )}
                </div>
                <div id="complete-progress-info" className="">
                  <h3 className="base text-md font-semibold">{inComingStatus} ...</h3>
                  {/* <p className="base text-gray-400">
                    {findCurrentStatusDate(status, "dateTime")}
                  </p> */}
                </div>
              </div>
            )}

            {/* cancel */}
            {/* {isCancel && (
              <div
                id="cancel-progress-order"
                className="flex justify-start items-center gap-3"
              >
                <div
                  id="icon-progress-order"
                  className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center"
                >
                  <CancelIcon className="w-full h-full text-red-500" />
                </div>
                <div id="complete-progress-info" className="">
                  <h3 className="base text-md font-semibold">Order Placed</h3>
                  <p className="base text-gray-400">
                    {findCurrentStatusDate(status, "dateTime")}
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
