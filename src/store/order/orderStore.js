import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createOrderSlice } from "./orderSlice";
export const useOrderStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createOrderSlice(set, get),
      })),
      { name: "order-store" }
    )
  )
);
