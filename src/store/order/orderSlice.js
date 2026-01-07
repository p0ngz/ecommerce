import { axiosClient } from "../../utils/axiosClient";
// const initialOrderState = {}
export const createOrderSlice = (set, get) => ({
  //   order: initialOrderState,
  setOrder: (orderData) => {
    set((state) => ({
      ...state,
      orderData,
    }));
  },
  getOrder: () => {
    const order = get().order;
    return order;
  },
  getAllOrders: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/order", {
          params: { ...filter },
        });
      } else {
        response = await axiosClient.get("/order");
      }

      const orders = response?.data;
      if (!orders || orders.count === 0) {
        console.error("No orders found");
      }

      return orders;
    } catch (err) {
      console.error("Error getAllOrders data: ", err);
    }
  },
  getOrderByOrderId: async (orderId) => {
    try {
      const response = await axiosClient.get("/order/" + orderId);
      const order = response?.data?.order;

      if (!order) {
        console.error("No order data found for ID: ", orderId);
      }

      return order;
    } catch (err) {
      console.error("Error fetching order by ID: ", err);
    }
  },
  getOrdersByUserId: async (userId) => {
    try {
      const response = await axiosClient.get("/order", { params: { userID: userId } });
      const ordersByUser = response?.data?.orders;
      if (!ordersByUser || ordersByUser.length === 0) {
        console.error("No orders found for user ID: ", userId);
      }

      return ordersByUser;
    } catch (err) {
      console.error("Error fetching orders by user ID: ", err);
    }
  },
  createOrder: async (orderData) => {
    try {
      const response = await axiosClient.post("/order", orderData);
      const createdOrder = response?.data?.order;

      if (!createdOrder) {
        console.error("Failed to create new order");
      }
      return createdOrder;
    } catch (err) {
      console.error("Error creating order: ", err);
    }
  },
  updateOrderByOrderId: async (orderId, orderData) => {
    try {
      const response = await axiosClient.put("/order/" + orderId, orderData);
      const updatedOrder = response?.data?.order;

      if (!updatedOrder) {
        console.error("Failed to update order for ID: ", orderId);
      }

      return updatedOrder;
    } catch (err) {
      console.error("Error updating order by ID: ", err);
    }
  },
  deleteOrderByOrderId: async (orderId) => {
    try {
      const response = await axiosClient.delete("/order/" + orderId);
      const deletedOrder = response?.data?.order;
      if (!deletedOrder) {
        console.error("Failed to delete order for ID: ", orderId);
      }
      return deletedOrder;
    } catch (err) {
      console.error("Error deleting order by ID: ", err);
    }
  },
});
