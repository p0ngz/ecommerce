import React from "react";
import TypeProductsComponent from "../components/TypeProductsComponent";
import { ToastContainer } from "react-toastify";

const ProductTypePage = () => {
  return (
    <>
      <TypeProductsComponent />
      <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    </>
  );
};

export default ProductTypePage;
