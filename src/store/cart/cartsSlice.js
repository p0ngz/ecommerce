import { axiosClient } from "../../config/axios";
const initialCartState = [];
export const createCartSlice = (set, get) => ({
  cart: initialCartState,
  setCart: (cartData) => {
    set((state) => ({
      ...state,
      cartData,
    }));
  },
  getCart: () => {
    const carts = get().cart;
    return carts;
  },
  getAllCarts: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/cartlist", { params: { ...filter } });
      } else {
        response = await axiosClient.get("/cartlist");
      }
      const cartLists = response?.data?.cartLists;

      if (!cartLists || cartLists.length === 0) {
        console.error("No carts found");
      }

      return cartLists;
    } catch (err) {
      console.error("Error getAllCarts data: ", err);
    }
  },
  getCartListByCartListId: async (cartListId) => {
    try {
      const response = await axiosClient.get("/cartlist/" + cartListId);
      const cartList = response?.data;
      if (!cartList) {
        console.error("No cart list data found for ID: ", cartListId);
      }
      return cartList;
    } catch (err) {
      console.error("Error getCArtListByCartListId data: ", err);
    }
  },
  getCartListByUserId: async (userId) => {
    try {
      const response = await axiosClient.get("/cartlist/user/" + userId);
      const cartListByUserId = response?.data;
      if (!cartListByUserId || cartListByUserId.length === 0) {
        console.error("No cart list data found for User ID: ", userId);
      }
      return cartListByUserId;
    } catch (err) {
      console.error("Error getCartListByUserId data: ", err);
    }
  },
  createAndUpdateCartListByUserId: async (userId, cartListData) => {
    try {
      const response = await axiosClient.post("/cartlist/user/" + userId, cartListData); // wait fix create and delete separately
      const updatedCartList = response?.data?.cartList;
      if (!updatedCartList || Object.keys(updatedCartList).length === 0) {
        console.error("Failed to create or update cart list for User ID: ", userId);
      }

      return updatedCartList;
    } catch (err) {
      console.error("Error createAndUpdateCartListByUserId data: ", err);
    }
  },
  //   delete all cartlist by user id
  deleteCartListByUserId: async (userId) => {
    try {
      const response = await axiosClient.delete("/cartlist/user/" + userId);
      const deletedCartList = response?.data?.deletedCartList;
      if (!deletedCartList || deletedCartList.length === 0) {
        console.error("Failed to delete cart list for User ID: ", userId);
      }
      return deletedCartList;
    } catch (err) {
      console.error("Error deleteCartListByUserId data: ", err);
    }
  },
  //   delete cartlist by cartlist id
  deleteCartListByCartListId: async (cartListId) => {
    try {
      const response = await axiosClient.delete("/cartlist/" + cartListId);
      const deletedCartList = response?.data?.deletedCartList;
      if (!deletedCartList || Object.keys(deletedCartList).length === 0) {
        console.error("Failed to delete cart list for Cart List ID: ", cartListId);
      }
      return deletedCartList;
    } catch (err) {
      console.error("Error deleteCartListByCartListId data: ", err);
    }
  },
});
