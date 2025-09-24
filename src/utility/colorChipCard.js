export const colorChipCardFromRole = (role) => {
  switch (role) {
    case "admin":
      return "bg-orange-500 text-white";
    case "member":
      return "bg-yellow-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const colorChipCardFromStatusOrder = (status) => {
  switch (status) {
    case "OrderPlaced":
      return "bg-blue-400";
    case "Pending":
      return "bg-orange-400";
    case "Processing":
      return "bg-yellow-400";
    case "Shipped":
      return "bg-purple-400";
    case "Delivered":
      return "bg-green-400";
    case "Cancelled":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};
export const colorChipCardFromStatusCoupon = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-400";
    case "Used":
      return "bg-gray-400";
    case "Expired":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};
