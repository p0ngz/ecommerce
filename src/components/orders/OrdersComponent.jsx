import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "../profile/OrderList";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useOrderStore } from "../../store/order/orderStore";
import { useShallow } from "zustand/shallow";

const OrdersComponent = () => {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  const { getOrdersByUserId } = useOrderStore(
    useShallow((state) => {
      return {
        getOrdersByUserId: state.getOrdersByUserId,
      };
    })
  );
  const transformOrderData = (apiOrders) => {
    return apiOrders.map((order) => ({
      _id: order._id,
      orderId: order.orderID,
      createdAt: order.createdAt,
      status: order.status.currentStatus,
      order: {
        items: order.detail.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price / item.quantity,
          color: item.color,
          size: item.size,
          discountProduct: item.discountProduct,
          totalPrice: item.totalPrice,
        })),
        count: order.totalItem,
        total: order.subTotal,
      },
      trackingStatus: {
        statusHistory: order.status.statusHistory,
        currentStatus: order.status.currentStatus,
        cancel: order.cancel,
      },
      shipping: order.shippingPrice,
      tax: order.taxPrice,
      address: `${order.deliverAddress.address}, ${order.deliverAddress.zipCode}`,
      trackingNumber: order.trackingNumber,
      paymentMethod: order.paymentMethod,
      discount: order.discount,
      totalPrice: order.totalPrice,
      coupon: order.coupon,
      deliverAddress: order.deliverAddress,
    }));
  };
  const getOrderListHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const orders = await getOrdersByUserId(userId);
      console.log("orders in UserOrderList: ", orders);
      // Transform the API data before setting state
      const transformedOrders = transformOrderData(orders);
      setOrderList(transformedOrders);
    }
  }, [getOrdersByUserId]);
 
  useEffect(() => {
    getOrderListHandler();
  }, [getOrderListHandler]);
  return (
    <div id="orders-component" className="relative px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]">
      <h2 id="orders-title" className="text-center mb-3 text-3xl lg:text-5xl">
        Orders
      </h2>
      <div id="orders-breadcrumb" className="flex justify-center mb-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Typography
            underline="hover"
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
            color="inherit"
            sx={{
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Home
          </Typography>
          <Typography
            underline="hover"
            onClick={() => navigate("/profile")}
            className="hover:cursor-pointer"
            color="inherit"
            sx={{
              "&:hover": {
                color: "black",
                fontSize: {
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              },
            }}
          >
            Profile
          </Typography>
          <Typography
            sx={{
              color: "text.primary",
              fontSize: {
                xs: "1rem",
                sm: "1rem",
                md: "1.1rem",
                lg: "1.2rem",
              },
            }}
          >
            Orders
          </Typography>
        </Breadcrumbs>
      </div>
      <div id="orders-list-container" className="md:grid md:grid-cols-2 gap-2 lg:grid-cols-3 2xl:grid-cols-4">
        {orderList.map((order) => (
          <OrderList key={order._id} orderInfo={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersComponent;
