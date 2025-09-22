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
      return "bg-blue-400 text-gray-100";
    case "Pending":
      return "bg-orange-400 text-gray-100";
    case "Processing":
      return "bg-yellow-400 text-gray-100";
    case "Shipped":
      return "bg-purple-400 text-gray-100";
    case "Delivered":
      return "bg-green-400 text-gray-100";
    case "Cancelled":
      return "bg-red-400 text-gray-100";

    default:
      return "bg-gray-400 text-gray-100";
  }
};
