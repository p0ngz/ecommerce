import React from "react";
import ProductsComponent from "../components/ProductsComponent";
import { FilteredProductsProvider } from "../utility/context/filterProductsContext";
import { ToastContainer } from "react-toastify";

const ProductsPage = () => {
  return (
    <FilteredProductsProvider>
      <ProductsComponent />
      <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    </FilteredProductsProvider>
  );
};

export default ProductsPage;
