import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createWishlistSlice } from "./wishlistSlice";

export const useWishlistStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createWishlistSlice(set, get),
      })),
      { name: "wishlist-store" }
    )
  )
);
