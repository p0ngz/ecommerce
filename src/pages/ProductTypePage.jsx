import React from "react";
import TypeProductsComponent from "../components/TypeProductsComponent";
import { FilteredProductsProvider } from "../contexts/filterProductsContext";

const ProductTypePage = () => {
  return (
    <FilteredProductsProvider>
      <TypeProductsComponent />
    </FilteredProductsProvider>
  );
};

export default ProductTypePage;
