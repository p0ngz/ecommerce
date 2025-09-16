import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import productStore from "./productSlice";
import blogStore from "././blogSlice"
// persistStore and persistReducer it make store redux memorize previous data even user refresh page it not be initial
// const persisConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persisConfig, productStore);

export const store = configureStore({
  reducer: {
    Product: productStore,
    Blog: blogStore
  },
});

// export const persister = persistStore(store);
