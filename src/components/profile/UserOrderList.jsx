import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrderList from "./OrderList";
import { useOrderStore } from "../../store/order/orderStore";
import { useShallow } from "zustand/shallow";
// const orderListData = [
//   {
//     orderId: "ORD123456",
//     createdAt: "2023-10-01",
//     status: "Delivered",
//     order: {
//       items: [
//         { productId: "P001", name: "Product 1", quantity: 2, price: 100 },
//         { productId: "P002", name: "Product 2", quantity: 1, price: 50 },
//       ],
//       count: 3,
//       total: 250,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-10-01T10:30:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Processing",
//           date: "2023-10-02T09:15:00Z",
//           description: "Order is being prepared for shipment",
//         },
//         {
//           status: "Shipped",
//           date: "2023-10-03T14:20:00Z",
//           description: "Package has been shipped",
//         },
//         {
//           status: "Delivered",
//           date: "2023-10-05T16:45:00Z",
//           description: "Package delivered successfully",
//         },
//       ],
//       currentStatus: "Delivered",
//       cancel: false,
//     },
//     shipping: 5.99,
//     tax: 0.07,
//     address: "123 Main St, New York, NY 10001",
//     trackingNumber: "TRK123456789",
//   },
//   {
//     orderId: "ORD789012",
//     createdAt: "2023-10-15",
//     status: "OrderPlaced",
//     order: {
//       items: [
//         {
//           productId: "P003",
//           name: "Wireless Headphones",
//           quantity: 1,
//           price: 150,
//         },
//         { productId: "P004", name: "Phone Case", quantity: 2, price: 25 },
//         { productId: "P005", name: "Charging Cable", quantity: 1, price: 15 },
//       ],
//       count: 4,
//       total: 215,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-10-15T11:22:00Z",
//           description: "Order confirmed and payment processed",
//         },
//       ],
//       currentStatus: "OrderPlaced",
//       cancel: false,
//     },
//     shipping: 7.5,
//     tax: 0.08,
//     address: "456 Oak Ave, Los Angeles, CA 90210",
//     trackingNumber: "TRK789012345",
//   },
//   {
//     orderId: "ORD345678",
//     createdAt: "2023-11-02",
//     status: "Processing",
//     order: {
//       items: [
//         { productId: "P006", name: "Gaming Mouse", quantity: 1, price: 75 },
//         { productId: "P007", name: "Keyboard", quantity: 1, price: 120 },
//       ],
//       count: 2,
//       total: 195,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-11-02T08:45:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Processing",
//           date: "2023-11-03T13:30:00Z",
//           description: "Order is being prepared for shipment",
//         },
//       ],
//       currentStatus: "Processing",
//       cancel: false,
//     },
//     shipping: 6.25,
//     tax: 0.075,
//     address: "789 Pine St, Chicago, IL 60601",
//     trackingNumber: "TRK345678901",
//   },
//   {
//     orderId: "ORD567890",
//     createdAt: "2023-12-05",
//     status: "Shipped",
//     order: {
//       items: [
//         { productId: "P009", name: "Laptop Stand", quantity: 1, price: 45 },
//         { productId: "P010", name: "USB Hub", quantity: 1, price: 30 },
//         { productId: "P011", name: "Monitor", quantity: 1, price: 250 },
//         { productId: "P012", name: "Webcam", quantity: 1, price: 80 },
//       ],
//       count: 4,
//       total: 405,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-12-05T15:30:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Processing",
//           date: "2023-12-06T11:45:00Z",
//           description: "Order is being prepared for shipment",
//         },
//         {
//           status: "Shipped",
//           date: "2023-12-07T16:20:00Z",
//           description: "Package has been shipped and is in transit",
//         },
//       ],
//       currentStatus: "Shipped",
//       cancel: false,
//     },
//     shipping: 12.99,
//     tax: 0.085,
//     address: "654 Maple Ln, Seattle, WA 98101",
//     trackingNumber: "TRK567890123",
//   },
//   {
//     orderId: "ORD901234",
//     createdAt: "2023-11-18",
//     status: "Cancelled",
//     order: {
//       items: [{ productId: "P008", name: "Smart Watch", quantity: 1, price: 300 }],
//       count: 1,
//       total: 300,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-11-18T12:15:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Processing",
//           date: "2023-11-19T10:20:00Z",
//           description: "Order is being prepared for shipment",
//         },
//         {
//           status: "Cancelled",
//           date: "2023-11-20T09:45:00Z",
//           description: "Order cancelled by customer request",
//         },
//       ],
//       currentStatus: "Cancelled",
//       cancel: true,
//     },
//     shipping: 8.99,
//     tax: 0.09,
//     address: "321 Elm Dr, Miami, FL 33101",
//     trackingNumber: "TRK901234567",
//   },
//   {
//     orderId: "ORD112233",
//     createdAt: "2023-12-10",
//     status: "Cancelled",
//     order: {
//       items: [
//         { productId: "P013", name: "Bluetooth Speaker", quantity: 1, price: 85 },
//         { productId: "P014", name: "Power Bank", quantity: 2, price: 40 },
//       ],
//       count: 3,
//       total: 165,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-12-10T14:15:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Cancelled",
//           date: "2023-12-10T15:30:00Z",
//           description: "Order cancelled by customer request before processing",
//         },
//       ],
//       currentStatus: "Cancelled",
//       cancel: true,
//     },
//     shipping: 4.99,
//     tax: 0.06,
//     address: "987 Cedar St, Austin, TX 78701",
//     trackingNumber: "TRK112233456",
//   },
//   {
//     orderId: "ORD445566",
//     createdAt: "2023-12-12",
//     status: "OrderPlaced",
//     order: {
//       items: [
//         { productId: "P015", name: "Tablet Case", quantity: 1, price: 35 },
//         { productId: "P016", name: "Screen Protector", quantity: 3, price: 12 },
//       ],
//       count: 4,
//       total: 71,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-12-12T09:30:00Z",
//           description: "Order confirmed and payment processed",
//         },
//       ],
//       currentStatus: "OrderPlaced",
//       cancel: false,
//     },
//     shipping: 3.99,
//     tax: 0.05,
//     address: "654 Oak Blvd, Denver, CO 80201",
//     trackingNumber: "TRK445566789",
//   },
//   {
//     orderId: "ORD778899",
//     createdAt: "2023-12-15",
//     status: "Processing",
//     order: {
//       items: [
//         { productId: "P017", name: "Wireless Mouse", quantity: 1, price: 55 },
//         { productId: "P018", name: "Mouse Pad", quantity: 1, price: 15 },
//       ],
//       count: 2,
//       total: 70,
//     },
//     trackingStatus: {
//       statusHistory: [
//         {
//           status: "OrderPlaced",
//           date: "2023-12-15T08:20:00Z",
//           description: "Order confirmed and payment processed",
//         },
//         {
//           status: "Processing",
//           date: "2023-12-16T10:15:00Z",
//           description: "Order is being prepared for shipment",
//         },
//       ],
//       currentStatus: "Processing",
//       cancel: false,
//     },
//     shipping: 2.99,
//     tax: 0.04,
//     address: "123 Birch Ave, Portland, OR 97201",
//     trackingNumber: "TRK778899123",
//   },
// ];
const UserOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const { getOrdersByUserId } = useOrderStore(
    useShallow((state) => {
      return {
        getOrdersByUserId: state.getOrdersByUserId,
      };
    })
  );

  const transformOrderData = (apiOrders) => {
    return apiOrders.map((order) => ({
      orderId: order.orderID,
      createdAt: order.createdAt,
      status: order.status.currentStatus,
      order: {
        items: order.detail.map((item) => ({
          product: item.product,
          name: item.product.productName,
          quantity: item.quantity,
          price: item.product.price ,
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
  const goToOrdersPageHandler = () => {
    const username = localStorage.getItem("username");
    navigate(`/profile/${username}/orders`);
  };
  useEffect(() => {
    getOrderListHandler();
  }, [getOrderListHandler]);
  return (
    // for real we need to fetch data from backend and filter from date
    <div
      id="user-order-list-container"
      className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3 "
    >
      {orderList.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-gray-400">No orders found...</span>
        </div>
      ) : (
        <>
          <div id="user-order-list-header" className="flex justify-between">
            <h2 className="text-lg font-semibold">Order List</h2>
            <button
              className="text-gray-700  hover:text-gray-900 hover:font-semibold hover:cursor-pointer"
              onClick={goToOrdersPageHandler}
            >
              See all..
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {orderList.map((order) => (
              <OrderList key={order.orderId} orderInfo={order} ProfilePage={true} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrderList;
