import React from "react";
import PropTypes from "prop-types";
const ChipCard = ({ text, bgColor = "", txtColor = "", textSize = "" }) => {
  return (
    <div
      className={` font-semibold min-w-10  px-3  py-1  rounded-lg flex items-center shadow-lg ${
        bgColor ? bgColor : "bg-gray-100"
      } ${txtColor ? txtColor : "text-gray-100"} ${textSize ? textSize : "text-xs sm:text-sm"}`}
    >
      {text}
    </div>
  );
};
export default ChipCard;

ChipCard.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  txtColor: PropTypes.string,
  textSize: PropTypes.string
};
