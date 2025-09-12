import { configureStore } from "@reduxjs/toolkit";
import productStore from "./productSlice"
export const store = configureStore({
    reducer: {
        Product: productStore 
    }
});
