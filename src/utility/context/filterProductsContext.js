import React, {
  createContext,
  useContext,
  createElement,
  useState,
} from "react";

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
  const [filteredData, setFilteredData] = useState(initialFilteredData);

  const filteredProductsHandler = (type, newFilter) => {
    setFilteredData((prev) => {
      return {  
        ...prev,
        [type]: newFilter,
      };
    });
  };
  return createElement(
    FilteredProductsContext.Provider,
    { value: { filteredData, setFilteredData, filteredProductsHandler } },
    children
  );
};

// use filtered context
export const useFilteredProducts = () => {
  return useContext(FilteredProductsContext);
};
