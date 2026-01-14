import React, { useState, useEffect, useCallback } from "react";
import CartList from "./CartList";
import { useShipping } from "../../utility/context/shippingContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCartStore } from "../../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";
const UserCartList = () => {
  const {
    shippingData,
    setShippingData,
    shippingPrice,
    tax,
    couponCode,
    setCouponCode,
    matchCouponCode,
    isMatchCoupon,
    setIsMatchCoupon,
    beforeDiscountCouponTotal,
    getTotalSummary,
  } = useShipping();

  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [discountFixed, setDiscountFixed] = useState(null);
  const [discountTotal, setDiscountTotal] = useState(0);
  const {
    getCartListByUserId,
    createOrUpdateCartListByUserId,
    updateCartListByCartListId,
    deleteCartListByUserId,
    deleteCartListByCartListId,
  } = useCartStore(
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

  const setCouponCodeHandler = (value) => {
    setCouponCode(value);
  };
  const getCartListByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const cartList = await getCartListByUserId(userId);
    setShippingData(cartList);
  }, [getCartListByUserId, setShippingData]);

  const applyCouponHandler = () => {
    if (couponCode && couponCode !== "") {
      const match = matchCouponCode(couponCode);
      const coupon = match?.coupon;
      if (coupon) {
        console.log(coupon?.discountType);
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



  useEffect(() => {
    if (isMatchCoupon && discountPercentage) {
      setDiscountTotal((beforeDiscountCouponTotal() * discountPercentage) / 100);
    } else if (discountFixed) {
      setDiscountTotal(discountFixed);
    }
  }, [isMatchCoupon, discountPercentage, beforeDiscountCouponTotal, shippingData]);
  useEffect(() => {
    getCartListByUserIdHandler();
  }, [getCartListByUserIdHandler]);

  return (
    <div
      id="user-cart-list-container"
      className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3"
    >
      <h1>User Cart List</h1>
      {shippingData?.length > 0 ? (
        <>
          {/* cart list */}
          {shippingData?.map((cart, index) => {
            const cartInfo = {
              cartListId: cart._id,
              productId: cart.product._id,
              productImg: cart.product.productImg,
              productName: cart.product.productName,
              rating: cart.product.rating,
              discount: cart.product.discount,
              price: cart.product.price,
              variants: cart.variants,
              color: cart.color,
              size: cart.size,
              quantity: cart.quantity,
              total: cart.total,
            };
            return <CartList cartInfo={cartInfo} key={index} />;
          })}
          <div id="coupon-code" className="my-5">
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
          <div id="cart-summary-container" className="flex flex-col gap-1">
            <h3 className="mb-5 font-semibold text-xl">Order Summary</h3>

            <div className="flex justify-between">
              <span className="base">Subtotal</span>
              <span className="base">${beforeDiscountCouponTotal()}</span>
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
                    (-{discountPercentage}%) ${discountTotal.toFixed(2)}
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
            <span className="base font-semibold">{getTotalSummary().toFixed(2)}</span>
          </div>
        </>
      ) : (
        <h2 className="text-gray-400">No items in cart...</h2>
      )}
    </div>
  );
};

export default UserCartList;
