import React, { createContext, useContext, createElement, useState, useEffect, useCallback } from "react";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";
import { set } from "date-fns";
const initialFilteredData = {
  collection: "",
  availability: "",
  price: {
    min: 0,
    max: 100,
  },
  color: [],
  size: [],
};

// filtered context
export const FilteredProductsContext = createContext();

// filtered provider
export const FilteredProductsProvider = ({ children }) => {
  const { getAllProduct } = useProductStore(
    useShallow((state) => ({
      getAllProduct: state.getAllProduct,
    }))
  );
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState(initialFilteredData);

  const filteredProductsHandler = (type, newFilter) => {
    setFilteredData((prev) => {
      return {
        ...prev,
        [type]: newFilter,
      };
    });
  };

  const fetchAllProducts = useCallback(
    async (filter) => {
      const products = await getAllProduct(filter);
      console.log(products);
      setProductData(products);
    },
    [getAllProduct]
  );
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);
  return createElement(
    FilteredProductsContext.Provider,
    { value: { productData, filteredData, setProductData, setFilteredData, filteredProductsHandler } },
    children
  );
};

// use filtered context
export const useFilteredProducts = () => {
  return useContext(FilteredProductsContext);
};
