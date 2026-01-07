import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createUserCouponSlice } from "./userCouponSlice";

export const useUserCouponStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createUserCouponSlice(set, get),
      })),
      { name: "user-coupon-store" }
    )
  )
);
