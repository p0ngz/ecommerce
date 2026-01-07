import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createBlogSlice } from "./blogSlice";

export const useBlogStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        ...createBlogSlice(set, get),
      })),
      { name: "blog-store" }
    )
  )
);
