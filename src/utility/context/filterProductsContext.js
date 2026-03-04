import React, {
  createContext,
  useContext,
  createElement,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";

const initialFilteredData = {
  collection: "",
  availability: "",
  price: {
    min: 0,
    max: null,
  },
  color: [],
  size: [],
};

/**
 * Maps internal filteredData shape → backend query params.
 * Only includes non-default values to keep requests clean.
 *
 * Backend expects:
 *   typeProduct, priceMin, priceMax, color, size, stock,
 *   search, from, to, page, limit, sort
 */
const buildQueryParams = (filteredData) => {
  const params = {};

  // collection → typeProduct
  if (filteredData.collection) {
    params.typeProduct = filteredData.collection;
  }

  // price → priceMin / priceMax
  if (filteredData.price.min > 0) {
    params.priceMin = filteredData.price.min;
  }
  if (filteredData.price.max !== null && filteredData.price.max !== undefined) {
    params.priceMax = filteredData.price.max;
  }

  // color → comma-separated string
  if (filteredData.color?.length > 0) {
    params.color = filteredData.color.join(",");
  }

  // size → "All" means no filter; otherwise comma-separated
  if (filteredData.size?.length > 0) {
    const sizeValue = filteredData.size[0]; // ["All"] or [["S","M"]]
    if (sizeValue !== "All") {
      params.size = Array.isArray(sizeValue) ? sizeValue.join(",") : sizeValue;
    }
  }

  // availability → stock ("inStock" / "outOfStock")
  if (filteredData.availability) {
    const stockMap = {
      "In Stock": "inStock",
      "Out of Stock": "outOfStock",
    };
    params.stock = stockMap[filteredData.availability] || filteredData.availability;
  }

  return params;
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
  const [isLoading, setIsLoading] = useState(true);

  const debounceRef = useRef(null);
  const prevParamsRef = useRef(null);

  // Stable handler — no unnecessary child re-renders
  const filteredProductsHandler = useCallback((type, newFilter) => {
    setFilteredData((prev) => ({ ...prev, [type]: newFilter }));
  }, []);

  const fetchAllProducts = useCallback(
    async (params = {}) => {
      setIsLoading(true);
      try {
        const hasParams = Object.keys(params).length > 0;
        const products = await getAllProduct(hasParams ? params : undefined);
        setProductData(products ?? []);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setProductData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [getAllProduct]
  );

  // use debounce for handle over fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = buildQueryParams(filteredData);
      const paramsKey = JSON.stringify(params);
      if (paramsKey === prevParamsRef.current) return;
      prevParamsRef.current = paramsKey;
      fetchAllProducts(params);
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [filteredData, fetchAllProducts]);

  // Memoized context value — prevents consumer re-renders from provider re-renders
  const contextValue = useMemo(
    () => ({ productData, filteredData, isLoading, setProductData, setFilteredData, filteredProductsHandler }),
    [productData, filteredData, isLoading, filteredProductsHandler]
  );

  return createElement(FilteredProductsContext.Provider, { value: contextValue }, children);
};

// use filtered context
export const useFilteredProducts = () => {
  return useContext(FilteredProductsContext);
};
