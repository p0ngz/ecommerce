import React from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const TipShipping = () => {
  return (
    <div id="promotion" className="mb-10 p-10 w-full h-auto  bg-[#f7f4ef]">
      <p className="mb-5 flex items-center">
        <TipsAndUpdatesIcon className="me-3 text-yellow-300" />
        Free shipping on orders $100.00 Congratulations , you've got free
        shipping!
      </p>
      <div
        id="promotion-bar"
        className="w-full bg-lime-200 rounded-full h-1.5 dark:bg-gray-700"
      >
        <div className="w-full bg-lime-600 h-1.5 rounded-full"></div>
      </div>
    </div>
  );
};

export default TipShipping;
