import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
const SummaryBill = ({confirmHandler}) => {
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(0);
  // Spinner and displayed total logic
  const [isCalculating, setIsCalculating] = useState(false);
  const [displayedTotal, setDisplayedTotal] = useState(0);
  // const navigate = useNavigate();

  // Get all needed values from context in one call
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    couponCode,
    setCouponCode,
    matchCouponCode,
    isMatchCoupon,
    setIsMatchCoupon,
    getTotal,
    getTotalSummary,
    beforeDiscountCouponTotal,
    shippingData,
    setFormDataOrder,
    isDisabledConfirm,
    setIsDisabledConfirm,
  } = useShipping();

  // Payment method labels
  const cashLabel = (
    <span className="flex items-center gap-1">
      <MonetizationOnIcon sx={{ fontSize: 18 }} /> Cash
    </span>
  );
  const qrLabel = (
    <span className="flex items-center gap-1">
      <QrCode2Icon sx={{ fontSize: 18 }} /> QR Code
    </span>
  );

  // Coupon code handler
  const setCouponCodeHandler = (value) => {
    setCouponCode(value);
  };

  // Payment method handler
  const paymentMethodHandler = (value) => {
    setSelectedPaymentMethod(value);
    setIsDisabledConfirm(false);
  };

  // Confirm order handler
  const confirmShippingOrder = () => {
    confirmHandler(true, selectedPaymentMethod)
    
  };

  // Coupon matching and discount percentage calculation
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
  }, [couponCode, matchCouponCode, setIsMatchCoupon]);

  // Memoized total calculations
  const beforeDiscountTotal = useMemo(
    () => {
      return beforeDiscountCouponTotal()
    },
    [beforeDiscountCouponTotal, shippingData]
  );
  const finalTotal = useMemo(
    () => (isMatchCoupon ? getTotalSummary() : beforeDiscountTotal),
    [isMatchCoupon, getTotalSummary, beforeDiscountTotal]
  );

  useEffect(() => {
    if (isMatchCoupon && discountPercentage) {
      setDiscountTotal((getTotalSummary() * discountPercentage) / 100);
    } else {
      setDiscountTotal(0);
    }
  }, [isMatchCoupon, discountPercentage, getTotalSummary, shippingData]);

  // Spinner logic: only spin when finalTotal changes, then update displayedTotal
  useEffect(() => {
    setIsCalculating(true);
    const timeout = setTimeout(() => {
      setDisplayedTotal(finalTotal);
      setIsCalculating(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [finalTotal]);

  // Loading spinner logic: show spinner when total changes
  useEffect(() => {}, [finalTotal]);

  // Update order info when relevant data changes
  useEffect(() => {
    const orderInfo = {
      shippingData,
      paymentMethod: selectedPaymentMethod,
      couponCode: isMatchCoupon ? couponCode : null,
      beforeDiscountTotal: beforeDiscountCouponTotal() ? beforeDiscountCouponTotal() : null,
      total: displayedTotal,
    };
    setFormDataOrder(orderInfo);
  }, [
    shippingData,
    selectedPaymentMethod,
    couponCode,
    finalTotal,
    setFormDataOrder,
  ]);
  useEffect(() => {
    if (selectedPaymentMethod) setIsDisabledConfirm(false);
  }, [selectedPaymentMethod]);
  // All hooks and logic go here
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
                  (-{discountPercentage}%) ${discountTotal.toFixed(2)}
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
              ) : Number.isFinite(displayedTotal) ? (
                <>$ {displayedTotal.toFixed(2)}</>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          height: 56,
          my: 3,
          backgroundColor: isDisabledConfirm ? "white" : "black",
          color: isDisabledConfirm ? "black" : "white",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
        onClick={() => confirmShippingOrder()}
        disabled={isDisabledConfirm ? true : false}
      >
        Confirm
      </Button>
    </div>
  );
};

export default SummaryBill;
