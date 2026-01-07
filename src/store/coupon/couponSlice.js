import { axiosClient } from "../../config/axios";
const initialCouponState = [];
export const createCouponSlice = (set, get) => ({
  coupons: initialCouponState,
  setCoupons: (couponData) => {
    set((state) => ({
      ...state,
      couponData,
    }));
  },
  getCoupons: () => {
    const coupons = get().coupons;
    return coupons;
  },
  getAllCoupons: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/coupon", { params: { ...filter } });
      } else {
        response = await axiosClient.get("/coupon");
      }
      const coupons = response?.data;
      if (!coupons || coupons.count === 0) {
        console.error("No coupons found");
      }
      return coupons;
    } catch (err) {
      console.error("Error getCoupons data: ", err);
    }
  },
  getCouponByCouponId: async (couponId) => {
    try {
      const response = await axiosClient.get(`/coupon/${couponId}`);
      const coupon = response?.data;

      if (!coupon || Object.keys(coupon).length === 0) {
        console.error("No coupon found");
      }
      return coupon;
    } catch (err) {
      console.error("Error getCouponByCouponId: ", err);
    }
  },
  createNewCoupon: async (couponData) => {
    try {
      const response = await axiosClient.post("/coupon", couponData);
      const createdCoupon = response?.data;
      if (!createdCoupon.coupon) {
        console.error("Failed to create new coupon");
      }

      return createdCoupon;
    } catch (err) {
      console.error("Error createNewCoupon: ", err);
    }
  },
  updateCouponByCouponId: async (couponId, couponData) => {
    try {
      const response = await axiosClient.put("/coupon/" + couponId, couponData);
      const updatedCoupon = response?.data;

      if (!updatedCoupon.coupon) {
        console.error("Failed to update coupon");
      }

      return updatedCoupon;
    } catch (err) {
      console.error("Error updateCouponById: ", err);
    }
  },
  softDeleteCouponByCouponId: async (couponId) => {
    try {
      const response = await axiosClient.delete("/coupon/" + couponId);
      const deletedCoupon = response?.data;
      if (!deletedCoupon.coupon) {
        console.error("Failed to soft delete coupon");
      }

      return deletedCoupon;
    } catch (err) {
      console.error("Error softDeleteCouponById: ", err);
    }
  },
  hardDeleteCouponByCouponId: async (couponId) => {
    try {
      const response = await axiosClient.delete("/coupon/" + couponId + "/hard");
      const deletedCoupon = response?.data;
      if (!deletedCoupon.coupon) {
        console.error("Failed to hard delete coupon");
      }
      return deletedCoupon;
    } catch (err) {
      console.error("Error hardDeleteCouponById: ", err);
    }
  },
});
