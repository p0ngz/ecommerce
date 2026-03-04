import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createProductSlice} from "./productSlice"
export const useProductStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createProductSlice(set, get),
      })),
      { name: "product-store" }
    )
  )
);
