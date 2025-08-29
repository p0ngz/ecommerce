import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Divider from "@mui/material/Divider";
import { useShipping } from "../contexts/shippingContext";
import LoadingSpinner from "../utility/LoadingSpinner";

// for real if use couponCode need user click APPLY first then go check no auto check like this => w8 to refactor
const SummaryBill = () => {
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    couponCode,
    setCouponCode,
    matchCouponCode,
    isMatchCoupon,
    setIsMatchCoupon,
    getTotal,
    shippingData,
    getTotalSummary,
    beforeDiscountCouponTotal,
  } = useShipping();
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastTotal, setLastTotal] = useState(getTotalSummary());

  const cashLabel = (
    <span className="flex items-center gap-1">
      <MonetizationOnIcon fontSize="small" />
      cash
    </span>
  );
  const qrLabel = (
    <span className="flex items-center gap-1">
      <QrCode2Icon fontSize="small" />
      QR PromptPay
    </span>
  );
  const paymentMethodHandler = (val) => {
    setSelectedPaymentMethod(val);
  };
  const setCouponCodeHandler = (val) => {
    setCouponCode(val);
  };
  useEffect(() => {
    if (couponCode && couponCode !== "") {
      const match = matchCouponCode(couponCode);
      if (match.length > 0) {
        setIsMatchCoupon(true);
        match[0]?.discountType === "percent"
          ? setDiscountPercentage(match[0]?.discount)
          : setDiscountPercentage(null);
      } else {
        setIsMatchCoupon(false);
        setDiscountPercentage(null);
      }
    } else {
      setIsMatchCoupon(false);
      setDiscountPercentage(null);
    }
  }, [couponCode]);
  useEffect(() => {
    setDiscountTotal((getTotalSummary() * discountPercentage) / 100);
  }, [discountPercentage]);
  //   useEffect(() => {
  //     setIsCalculating(true);
  //     const timer = setTimeout(() => setIsCalculating(false), 300); // adjust as needed
  //     return () => clearTimeout(timer);
  //   }, [isMatchCoupon, shippingData, couponCode]);
  useEffect(() => {
    setIsCalculating(true);
    const newTotal = getTotalSummary();
    if (newTotal !== lastTotal) {
      setTimeout(() => {
        setLastTotal(newTotal);
        setIsCalculating(false);
      }, 500);
    } else {
      setIsCalculating(false);
    }
    // eslint-disable-next-line
  }, [getTotalSummary, isMatchCoupon, shippingData, couponCode]);

  return (
    <div id="action-shipping" className="p-10 w-full h-auto  bg-[#f6f6f6] ">
      <div id="payment-method">
        <p className="mb-5 font-semibold text-xl">Payment Method</p>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedPaymentMethod}
            onChange={(e) => paymentMethodHandler(e.target.value)}
            sx={{ display: "flex" }}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label={cashLabel}
            />
            <FormControlLabel value="qr" control={<Radio />} label={qrLabel} />
          </RadioGroup>
        </FormControl>
      </div>
      <Divider sx={{ mx: 2, borderColor: "#e5e7eb", my: 3 }} />

      <div id="coupon-code">
        <p className="mb-5 font-semibold text-xl">Coupon Code</p>
        <Box
          component="form"
          sx={{ width: "100%", display: "flex" }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            placeholder="Enter Coupon code"
            onChange={(e) => setCouponCodeHandler(e.target.value)}
            sx={{ width: "100%", height: 56 }}
          />
          <Button
            variant="outlined"
            sx={{
              width: "50%",
              height: 56,
              px: 3,
              backgroundColor: "black",
              color: "white",
            }}
          >
            APPLY
          </Button>
        </Box>
      </div>
      <Divider sx={{ mx: 2, borderColor: "#e5e7eb", my: 3 }} />

      <div id="order-summary">
        <p className="mb-5 font-semibold text-xl">Order Summary</p>
        <div id="show-items-summary">
          {shippingData.map((product) => {
            return (
              <div
                key={product.titleProduct}
                className="mb-3 flex justify-between items-center"
              >
                <p className="text-sm">{product.titleProduct}</p>
                {product.discount > 0 && product.quantity > 0 ? (
                  <div className="flex gap-3">
                    <p className="number line-through text-red-400 text-sm font-semibold">
                      ${product.price * product.quantity}
                    </p>
                    <p className="number text-sm font-semibold">
                      ${getTotal(product.id).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="number 400 text-sm font-semibold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            );
          })}
          <div className="flex justify-between items-center">
            <p className="">
              Discount
              {isMatchCoupon && couponCode && couponCode !== "" ? (
                <>
                  <span>{isMatchCoupon}</span>
                  <span className="number">({couponCode})</span>
                </>
              ) : (
                ""
              )}
            </p>
            <p className="text-sm font-semibold">
              {isMatchCoupon && discountPercentage ? (
                <span className="number text-red-400">
                  (-{discountPercentage}%) ${discountTotal}
                </span>
              ) : (
                <span className="number ">-</span>
              )}
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-dashed border-gray-400 flex justify-between items-center">
            <p className="font-semibold text-lg">Total</p>
            <p className="number font-semibold text-lg">
              {isCalculating ? (
                <LoadingSpinner />
              ) : isMatchCoupon ? (
                <>$ {getTotalSummary().toFixed(2)}</>
              ) : (
                <>$ {beforeDiscountCouponTotal().toFixed(2)}</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBill;
