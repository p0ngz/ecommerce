import React, { useMemo } from "react";
import ChipCard from "../../utility/components/ChipCard";
import RedeemSharpIcon from "@mui/icons-material/RedeemSharp";
import { colorChipCardFromStatusCoupon } from "../../utility/colorChipCard";
import { format } from "date-fns";

const CouponList = ({ couponInfo }) => {
  const { id, code, title, description, expiresAt, status, minTotalPrice, discount, discountType, validFrom } =
    couponInfo;
  const checkDisabled = useMemo(() => {
    return status !== "Available";
  }, [status]);
  const checkValidFrom = useMemo(() => {
    const todayDate = new Date();
    const validFromDate = new Date(validFrom);
    return validFromDate > todayDate;
  }, [validFrom]);
  const checkExpired = useMemo(() => {
    const todayDate = new Date();
    const expireDate = new Date(expiresAt);

    return expireDate < todayDate;
  }, [expiresAt]);
  const styleActionButtonHandler = (status) => {
    if (status === "Available") {
      return "bg-white text-black  border-gray-300  hover:bg-gray-300 hover:text-white  hover:cursor-pointer transition ";
    } else {
      return "text-gray-400  border-gray-200 cursor-not-allowed";
    }
  };
  const applyCouponHandler = () => {
    console.log("Apply coupon!");
  };

  return (
    <div
      id="coupon-list"
      className="px-3 py-3 w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div id="coupon-header" className="mb-2 flex justify-between items-center">
        <div id="icon-code-container" className="py-2 flex justify-start items-center gap-2">
          <RedeemSharpIcon
            sx={{
              fontSize: {
                xs: "medium",
                sm: "medium",
                md: "large",
                lg: "large",
              },
              color: "#4d4946ff",
            }}
          />
          <p className="base text-xs sm:text-sm md:text-md lg:text-lg flex ">{code}</p>
        </div>
        <div id="chip-card-container" className="py-2">
          <ChipCard text={status} bgColor={colorChipCardFromStatusCoupon(status)} />
        </div>
      </div>
      <div id="coupon-info" className="mb-2">
        <h3 className="base leading-5 text-sm font-semibold">{title}</h3>
        <p className="base leading-5 text-xs text-gray-500">{description}</p>
      </div>
      <div className="hidden lg:block my-4 w-full  border-t border-gray-200"></div>
      <div id="coupon-action" className="flex justify-between items-center">
        <div id="valid-container" className="">
          {checkValidFrom && (
            <p className={`base text-xs  ${checkExpired ? "text-gray-500" : ""}`}>
              Can be used: {format(new Date(validFrom), "MMM dd, yyyy")}
            </p>
          )}
          <p className={`base text-xs  ${checkExpired ? "text-gray-500" : ""}`}>
            Expires: {format(new Date(expiresAt), "MMM dd, yyyy")}
          </p>
        </div>
        <button
          disabled={checkDisabled}
          className={`bg-white px-4 py-1 rounded-md text-xs border ${styleActionButtonHandler(status)}`}
          onClick={applyCouponHandler}
        >
          {checkDisabled || checkExpired ? "Cannot Use" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default CouponList;
