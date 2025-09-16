import { createSlice } from "@reduxjs/toolkit";
const initialProductState = {
  product: {
    imgSrc: "",
    discount: 0,
    rating: 0,
    titleProduct: "",
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
        imgSrc,
        discount,
        rating,
        titleProduct,
        type,
        price,
        description,
      } = action.payload;
      const newProduct = {
        imgSrc,
        discount,
        rating,
        titleProduct,
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
