import { axiosClient } from "../../config/axios";

const initialUserCouponState = [];

export const createUserCouponSlice = (set, get) => ({
  userCoupons: initialUserCouponState,
  setUserCoupons: (userCouponData) => {
    set((state) => ({
      ...state,
      userCouponData,
    }));
  },
  getUserCoupons: () => {
    const userCoupons = get().userCoupons;
    return userCoupons;
  },
  getAllUserCoupons: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/user-coupon", { params: { ...filter } });
      } else {
        response = await axiosClient.get("/user-coupon");
      }

      const userCoupons = response?.data;
      if (!userCoupons || userCoupons.count === 0) {
        console.error("No userCoupons data found");
      }

      return userCoupons;
    } catch (err) {
      console.error("Error getUserCoupon data: ", err);
    }
  },
  getUserCouponByUserCouponId: async (userCouponId) => {
    try {
      const response = await axiosClient.get("/user-coupon/" + userCouponId);
      const userCouponByUserCouponId = response?.data;
      if (!userCouponByUserCouponId.userCoupon) {
        console.error("No userCoupon data found for userCouponId: ", userCouponId);
      }

      return userCouponByUserCouponId;
    } catch (err) {
      console.error("Error fetching userCoupon by userCouponId: ", err);
    }
  },
  getUserCouponByUserId: async (userId, populate = "all") => {
    try {
      const response = await axiosClient.get("/user-coupon/user/" + userId, { params: { populate } });
      const userCouponByUserId = response?.data;
      if (!userCouponByUserId || userCouponByUserId.count === 0) {
        console.error("No userCoupon data found for userId: ", userId);
      }

      return userCouponByUserId;
    } catch (err) {
      console.error("Error fetching userCoupon by userId: ", err);
    }
  },
  getUserCouponByCouponId: async (couponId) => {
    try {
      const response = await axiosClient.get("/user-coupon/coupon/" + couponId);
      const userCouponByCouponId = response?.data;
      if (!userCouponByCouponId || userCouponByCouponId.count === 0) {
        console.error("No userCoupon data found for couponId: ", couponId);
      }
      return userCouponByCouponId;
    } catch (err) {
      console.error("Error fetching userCoupon by couponId: ", err);
    }
  },
  //   when user receives coupon
  createMapCouponWithUser: async (userID, couponID) => {
    try {
      const response = await axiosClient.post("/user-coupon", {
        bodyData: {
          userID,
          couponID,
        },
      });
      const newUserCoupon = response?.data;
      if (!newUserCoupon.userCoupon) {
        console.error("No userCoupon data mapped created");
      }

      return newUserCoupon;
    } catch (err) {
      console.error("Error creating map coupon with user: ", err);
    }
  },
  //   when used
  updateUserCouponByUserIdAndCouponId: async (userId, couponId) => {
    try {
      const response = await axiosClient.put("/user-coupon/" + couponId + "/" + userId);
      const updatedUserCoupon = response?.data;
      if (!updatedUserCoupon.userCoupon || !updatedUserCoupon.coupon) {
        console.error("No updated userCoupon data returned from server");
      }

      return updatedUserCoupon;
    } catch (err) {
      console.error("Error updating userCoupon by userId and couponId: ", err);
    }
  },
  softDeleteUserCouponByUserCouponId: async (userCouponId) => {
    try {
      const response = await axiosClient.delete("/user-coupon/" + userCouponId);
      const deletedUserCoupon = response?.data;
      if (!deletedUserCoupon.userCoupon) {
        console.error("No soft deleted userCoupon data returned from server");
      }

      return deletedUserCoupon;
    } catch (err) {
      console.error("Error soft deleting userCoupon by userCouponId: ", err);
    }
  },
  hardDeleteUserCouponByUserCouponId: async (userCouponId) => {
    try {
      const response = await axiosClient.delete("/user-coupon/" + userCouponId + "/hard");
      const deletedUserCoupon = response?.data;
      if (!deletedUserCoupon.userCoupon) {
        console.error("No hard deleted userCoupon data returned from server");
      }

      return deletedUserCoupon;
    } catch (err) {
      console.error("Error hard deleting userCoupon by userCouponId: ", err);
    }
  },
});
