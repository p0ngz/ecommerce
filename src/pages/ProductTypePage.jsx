import React from "react";
import TypeProductsComponent from "../components/TypeProductsComponent";
import { FilteredProductsProvider } from "../utility/context/filterProductsContext";

const ProductTypePage = () => {
  return (
    <FilteredProductsProvider>
      <TypeProductsComponent />
    </FilteredProductsProvider>
  );
};

export default ProductTypePage;
