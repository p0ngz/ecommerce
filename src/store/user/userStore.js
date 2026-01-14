import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createUserSlice } from "./userSlice";

export const useUserStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createUserSlice(set, get),
      })),
      { name: "user-store"}
    )
  )
);
