import React from "react";
import PropTypes from "prop-types";
import Inventory2SharpIcon from "@mui/icons-material/Inventory2Sharp";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const OrderProcessCard = ({
  status,
  completeDate = "",
  isPast = false,
  isCurrent = false,
  isComing = false,
  isCancel = false,
}) => {
  const iconOrderProcessHandle = (status) => {
    const iconStyle = {
      fontSize: { xs: "large", sm: "large", md: "large", lg: "large", xl: "large" },
    };

    switch (status) {
      case "OrderPlaced":
        return <Inventory2SharpIcon sx={iconStyle} />;
      case "Processing":
        return <AccessTimeFilledSharpIcon sx={iconStyle} />;
      case "Shipped":
        return <LocalShippingSharpIcon sx={iconStyle} />;
      case "Delivered":
        return <CheckCircleOutlineSharpIcon sx={iconStyle} />;
      default:
        return <Inventory2SharpIcon sx={iconStyle} />;
    }
  };

  const titleOrderProcess = (status) => {
    switch (status) {
      case "OrderPlaced":
        return "Order Placed";
      case "Processing":
        return "Processing";
      case "Shipped":
        return "Shipped";
      case "Delivered":
        return "Delivered";
      default:
        return status;
    }
  };

  const descriptionOrderProcess = (status) => {
    if (completeDate) {
      return completeDate;
    } else {
      switch (status) {
        case "OrderPlaced":
          return "Your order has been placed.";
        case "Processing":
          return "Order is being prepared.";
        case "Shipped":
          return "Package is on the way.";
        case "Delivered":
          return "Package delivered successfully.";
        default:
          return "Order status update.";
      }
    }
  };

  const getIconContainerStyles = () => {
    return "p-3 rounded-full bg-gray-100 border border-gray-300";
  };

  const getIconColor = () => {
    return "text-gray-600";
  };

  const getTitleStyles = () => {
    return "base text-lg font-semibold text-gray-700";
  };

  const getDescriptionStyles = () => {
    return "base text-gray-500";
  };

  const getContainerStyles = () => {
    if(isComing) return "opacity-50";
    return "border border-gray-200";
  };
  return (
    <div id="order-status" className={`flex justify-between items-center  p-2 rounded-lg ${getContainerStyles()}`}>
      <div className="flex justify-start items-center gap-3">
        <div id="ordered-status-icon" className={`p-3 rounded-full shadow-md ${getIconContainerStyles()}`}>
          <div className={getIconColor()}>{iconOrderProcessHandle(status)}</div>
        </div>
        <div id="order-status-info" className="flex flex-col justify-start">
          <h3 id="order-id" className={getTitleStyles()}>
            {titleOrderProcess(status)}
          </h3>
          <span className={getDescriptionStyles()}>{descriptionOrderProcess(status)}</span>
        </div>
      </div>
      <div>
        {isCancel && (
          <ClearSharpIcon
            sx={{
              fontSize: { xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
              fontWeight: "bold",
            }}
            className="text-red-600"
          />
        )}
        {(isPast || isCurrent) && !isCancel && (
          <CheckSharpIcon
            sx={{
              fontSize: { xs: "2rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
              fontWeight: "bold",
            }}
            className="text-green-600"
          />
        )}
      </div>
    </div>
  );
};

export default OrderProcessCard;
