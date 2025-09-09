import React, {
  createContext,
  useContext,
  createElement,
  useState,
} from "react";

const initialFilteredData = {
  type: "",
  filter: "",
};

// filtered context
export const FilteredProductsContext = createContext();

// filtered provider
export const FilteredProductsProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState(initialFilteredData);
  return createElement(
    FilteredProductsContext.Provider,
    { value: { filteredData, setFilteredData } },
    children
  );
};

// use filtered context
export const useFilteredProducts = () => {
  return useContext(FilteredProductsContext);
};
