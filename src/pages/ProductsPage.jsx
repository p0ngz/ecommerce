import React from "react";
import ProductsComponent from "../components/ProductsComponent";
import { FilteredProductsProvider } from "../utility/context/filterProductsContext";

const ProductsPage = () => {
  return (
    <FilteredProductsProvider>
      <ProductsComponent />
    </FilteredProductsProvider>
  );
};

export default ProductsPage;
