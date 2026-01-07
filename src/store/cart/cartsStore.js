import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createCartSlice } from "./cartsSlice";

export const useCartStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createCartSlice(set, get),
      })),
      { name: "cart-store" }
    )
  )
);
