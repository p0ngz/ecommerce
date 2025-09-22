import React from "react";
import PropTypes from "prop-types";
const ChipCard = ({ text, bgColor = "", txtColor = "" }) => {
  return (
    <span
      className={`text-xs sm:text-sm font-semibold min-w-10  px-3 py-1 rounded-lg flex items-center ${
        bgColor ? bgColor : "bg-gray-100"
      } ${txtColor ? txtColor : "text-gray-800"}`}
    >
      {text}
    </span>
  );
};
export default ChipCard;

ChipCard.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  txtColor: PropTypes.string,
};
