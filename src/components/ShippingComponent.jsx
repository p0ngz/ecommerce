import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import CartList from "./profile/CartList";
// import TipShipping from "../components/TipShipping";
import AddressShipping from "../components/AddressShipping";
import SummaryBill from "../components/SummaryBill";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useShipping } from "../utility/context/shippingContext";
import { useCartStore } from "../store/cart/cartsStore";
import { useOrderStore } from "../store/order/orderStore";
import { useShallow } from "zustand/shallow";
import CustomToast from "../utility/CustomToast";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const ShippingComponent = () => {
  const {
    shippingData,
    setShippingData,
    selectedPaymentMethod,
    shippingAddress,
    shippingPrice,
    discountValue,
    tax,
    beforeDiscountCouponTotal,
    getTotalSummary,
    couponId,
  } = useShipping();

  // const navigate = useNavigate();
  const { getCartListByUserId } = useCartStore(
    useShallow((state) => {
      return {
        getCartListByUserId: state.getCartListByUserId,
      };
    })
  );
  const { createOrder } = useOrderStore(
    useShallow((state) => {
      return {
        createOrder: state.createOrder,
      };
    })
  );
  const toastHandler = (status, statusTxt, descriptionTxt, productImg, productName) => {
    if (status === "success") {
      toast.success(
        <CustomToast
          statusTxt={statusTxt}
          descriptionTxt={descriptionTxt}
          productName={productName}
          productImg={productImg}
        />,
        {
          position: "top-right",
        }
      );
    }
    if (status === "error") {
      toast.error(
        <CustomToast
          statusTxt={statusTxt}
          descriptionTxt={descriptionTxt}
          productName={productName}
          productImg={productImg}
        />,
        {
          position: "top-right",
        }
      );
    }
  };
  const receiveConfirm = async (confirm) => {
    if (confirm) {
      const userId = localStorage.getItem("userId");
      const totalItem = shippingData.length;
      const detailFormat = shippingData.map((item) => {
        return {
          product: item.product._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
        };
      });
      const subTotal = beforeDiscountCouponTotal();
      const totalPrice = getTotalSummary();
      const order = {
        userID: userId,
        totalItem,
        paymentMethod: selectedPaymentMethod,
        detail: detailFormat,
        subTotal,
        deliverAddress: shippingAddress,
        shippingPrice: shippingPrice,
        taxPrice: tax,
        discount: discountValue,
        totalPrice,
        coupon: couponId,
      };
      console.log("order: ", order);

      try {
        const createdOrder = await createOrder(order);
        if (createdOrder) {
          toastHandler("success", "Created", "Order successfully created");
        } else {
          toastHandler("error", "Created", "Order failed created");
        }
      } catch (err) {
        console.error("create order error: ", err);
        toastHandler("error", "Created", "Order failed created");
      }
    }
  };

  const getCartListByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const cartList = await getCartListByUserId(userId);
    setShippingData(cartList);
  }, [getCartListByUserId, setShippingData]);

  useEffect(() => {
    getCartListByUserIdHandler();
  }, [getCartListByUserIdHandler]);

  return (
    <div id="shipping=page" className="px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]">
      <h2 id="shipping-title" className="mb-3 text-3xl">
        Shipping Cart
      </h2>
      <div id="shipping-breadcrumb" className="mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            // styling separator
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
          >
            Home
          </Link>

          <Typography sx={{ color: "text.primary" }}>shipping</Typography>
        </Breadcrumbs>
      </div>
      <div
        id="shipping-container"
        className="w-full h-full grid grid-cols-1 sm:grid-cols-8 md:grid-col-8 xl:grid-col-8 lg:grid-col-8gap-5 "
      >
        <div id="left-shipping-container" className="sm:col-span-8 md:col-span-8 lg:col-span-5">
          {/* <div id="left-shipping-container" className=""> */}

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

          <div id="instruction" className="my-15">
            <p className="text-sm">Special instructions for seller</p>
            <Box sx={{ width: "100%", height: "100px" }}>
              <TextField fullWidth id="fullWidth" multiline minRows={4} />
            </Box>
          </div>
        </div>
        <div id="right-shipping-container" className="px-5 h-auto sm:col-span-8 md:col-span-8 lg:col-span-3">
          {/* <TipShipping /> */}
          <AddressShipping />
          <SummaryBill confirmHandler={receiveConfirm}></SummaryBill>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnHover={false} />
    </div>
  );
};

export default ShippingComponent;
