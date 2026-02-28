import React from "react";
import ProductsComponent from "../components/ProductsComponent";
import { ToastContainer } from "react-toastify";

const ProductsPage = () => {
  return (
    <>
      <ProductsComponent />
      <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    </>
  );
};

export default ProductsPage;
