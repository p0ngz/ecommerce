import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
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
import { useShipping } from "../utility/context/shippingContext";
import { useCartStore } from "../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";

const SummaryBill = ({ confirmHandler }) => {
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [discountFixed, setDiscountFixed] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(0);

  // const navigate = useNavigate();

  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    couponCode,
    setCouponCode,
    matchCouponCode,
    isMatchCoupon,
    setIsMatchCoupon,
    shippingPrice,
    tax,
    getTotalSummary,
    beforeDiscountCouponTotal,
    shippingData,
    isDisabledConfirm,
    setIsDisabledConfirm,
    shippingAddress,
    setCouponId,
  } = useShipping();
  const isDisableSubmit = useMemo(() => {
    return !shippingAddress || !selectedPaymentMethod;
  }, [shippingAddress, selectedPaymentMethod]);
  const { getCartListByUserId } = useCartStore(
    useShallow((state) => {
      return {
        getCartListByUserId: state.getCartListByUserId,
        createOrUpdateCartListByUserId: state.createOrUpdateCartListByUserId,
        updateCartListByCartListId: state.updateCartListByCartListId,
        deleteCartListByUserId: state.deleteCartListByUserId,
        deleteCartListByCartListId: state.deleteCartListByCartListId,
      };
    })
  );
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
  };

  // Confirm order handler
  const confirmShippingOrder = () => {
    // createOrder and navigate here
    confirmHandler(true);
  };

  const applyCouponHandler = () => {
    if (couponCode && couponCode !== "") {
      const match = matchCouponCode(couponCode);
      const coupon = match?.coupon;
      if (coupon) {
        setCouponId(coupon._id);
        setIsMatchCoupon(true);
        coupon?.discountType === "percentage"
          ? setDiscountPercentage(coupon?.discountValue)
          : (setDiscountPercentage(null), setDiscountFixed(coupon?.discountValue));
      } else {
        setIsMatchCoupon(false);
        setDiscountPercentage(null);
      }
    } else {
      setIsMatchCoupon(false);
      setDiscountPercentage(null);
    }
  };

  // Coupon matching and discount percentage calculation
  // useEffect(() => {
  //   if (couponCode && couponCode !== "") {
  //     const match = matchCouponCode(couponCode);
  //     if (match.length > 0) {
  //       setIsMatchCoupon(true);
  //       match[0]?.discountType === "percent" ? setDiscountPercentage(match[0]?.discount) : setDiscountPercentage(null);
  //     } else {
  //       setIsMatchCoupon(false);
  //       setDiscountPercentage(null);
  //     }
  //   } else {
  //     setIsMatchCoupon(false);
  //     setDiscountPercentage(null);
  //   }
  // }, [couponCode, matchCouponCode, setIsMatchCoupon]);

  useEffect(() => {
    if (isMatchCoupon && discountPercentage) {
      setDiscountTotal((beforeDiscountCouponTotal() * discountPercentage) / 100);
    } else if (discountFixed) {
      setDiscountTotal(discountFixed);
    }
  }, [isMatchCoupon, discountPercentage, beforeDiscountCouponTotal, shippingData]);

  useEffect(() => {
    if (selectedPaymentMethod) setIsDisabledConfirm(false);
  }, [selectedPaymentMethod]);

  useEffect(() => {
    console.log("shippingData: ", shippingData);
  }, [shippingData]);
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
            <FormControlLabel value="cash" control={<Radio />} label={cashLabel} />
            <FormControlLabel value="qr" control={<Radio />} label={qrLabel} />
          </RadioGroup>
        </FormControl>
      </div>
      <Divider sx={{ mx: 2, borderColor: "#e5e7eb", my: 3 }} />

      <div id="coupon-code">
        <p className="mb-5 font-semibold text-xl">Coupon Code</p>
        <Box component="form" sx={{ width: "100%", display: "flex" }} noValidate autoComplete="off">
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
            onClick={() => applyCouponHandler()}
          >
            APPLY
          </Button>
        </Box>
      </div>
      <Divider sx={{ mx: 2, borderColor: "#e5e7eb", my: 3 }} />

      <div id="order-summary">
        <p className="mb-5 font-semibold text-xl">Order Summary</p>
        <div id="show-items-summary">
          {shippingData?.map((product) => {
            return (
              <div key={product?.product.productName} className="mb-3 flex justify-between items-center">
                <p className="text-sm">{product?.product.productName}</p>
                {product?.product.discount > 0 && product?.quantity > 0 ? (
                  <div className="flex gap-3">
                    <p className="number line-through text-red-400 text-sm font-semibold">
                      ${product?.product.price * product?.quantity}
                    </p>
                    <p className="number text-sm font-semibold">
                      ${(product?.product.price * (1 - product?.product.discount / 100) * product?.quantity).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="number 400 text-sm font-semibold">
                    ${(product?.product.price * product.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            );
          })}
          <div className="border-b-4 border-dashed my-2 "></div>
          <div id="cart-summary-container" className="flex flex-col gap-1">
            {/* <h3 className="mb-5 font-semibold text-xl">Order Summary</h3> */}

            <div className="flex justify-between">
              <span className="base">Subtotal</span>
              <span className="base">${Number(beforeDiscountCouponTotal() ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="base">
                Discount
                {isMatchCoupon && couponCode && couponCode !== "" ? (
                  <>
                    <span className="number">({couponCode})</span>
                  </>
                ) : (
                  ""
                )}
              </p>
              <p className="text-sm font-semibold">
                {isMatchCoupon && discountPercentage ? (
                  <span className="number text-red-400">
                    (-{discountPercentage}%) ${Number(discountTotal ?? 0).toFixed(2)}
                  </span>
                ) : discountFixed ? (
                  <span className="number text-red-400">-${discountTotal.toFixed(2)}</span>
                ) : (
                  <span className="number ">-</span>
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <span className="base">Shipping</span>
              <span className="base">${shippingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="base">Tax(%)</span>
              <span className="base">{tax}</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between">
            <span className="base font-semibold text-xl">Total</span>
            <span className="base font-semibold">{Number(getTotalSummary() ?? 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Button
        variant="outlined"
        sx={{
          width: "100%",
          height: 56,
          my: 3,
          backgroundColor: isDisableSubmit ? "white" : "black",
          color: isDisabledConfirm ? "black" : "white",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
        onClick={() => confirmShippingOrder()}
        disabled={isDisableSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};

export default SummaryBill;
