import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  product: {
    productID: "",
    productImg: "",
    discount: 0,
    rating: 0,
    productName: "",
    price: 0,
    type: "",
    description: "",
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    setProduct: (state, action) => {
      const {
        productID,
        productImg,
        discount,
        rating,
        productName,
        type,
        price,
        description,
      } = action.payload;
      const newProduct = {
        productID,
        productImg,
        discount,
        rating,
        productName,
        type,
        price,
        description,
      };
      state.product = newProduct;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
