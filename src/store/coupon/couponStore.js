import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createCouponSlice } from "./coupon/couponSlice";

export const useCouponStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createCouponSlice(set, get),
      })),
      { name: "coupon-store" }
    )
  )
);
