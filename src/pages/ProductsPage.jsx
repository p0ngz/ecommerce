import React from "react";
import ProductsComponent from "../components/ProductsComponent";
import { FilteredProductsProvider } from "../contexts/filterProductsContext";

const ProductsPage = () => {
  return (
    <FilteredProductsProvider>
      <ProductsComponent />
    </FilteredProductsProvider>
  );
};

export default ProductsPage;
