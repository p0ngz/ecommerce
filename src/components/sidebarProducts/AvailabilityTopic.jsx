import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFilteredProducts } from "../../utility/context/filterProductsContext";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";
const availData = [
  {
    type: "In Stock",
    count: 17,
  },
  {
    type: "Out of Stock",
    count: 1,
  },
];
const AvailabilityTopic = () => {
  const { getAllProduct } = useProductStore(
    useShallow((state) => ({
      getAllProduct: state.getAllProduct,
    }))
  );
  const [inStock, setInStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [availabilityData, setAvailabilityData] = useState([
    {
      type: "In Stock",
      count: 0,
    },
    {
      type: "Out of Stock",
      count: 0,
    },
  ]);
  const [showMoreOrLess, setShowMoreOrLess] = useState(true);
  const { filteredProductsHandler } = useFilteredProducts();

  const showMoreOrLessHandler = (state) => {
    setShowMoreOrLess(state);
  };
  const filteredHandler = (filterData) => {
    filteredProductsHandler("availability", filterData);
  };
  const getInStockOutOfStockHandler = async () => {
    await Promise.all([getAllProduct({ stock: "inStock" }), getAllProduct({ stock: "outOfStock" })])
      .then(([inStockResponse, outOfStockResponse]) => {
        const inStockCount = inStockResponse?.length || 0;
        const outOfStockCount = outOfStockResponse?.length || 0;
        setInStock(inStockCount);
        setOutOfStock(outOfStockCount);
        setAvailabilityData([
          { type: "In Stock", count: inStockCount },
          { type: "Out of Stock", count: outOfStockCount },
        ]);
      })
      .catch((err) => {
        console.error("Error fetching in stock and out of stock products: ", err);
      });
  };
  useEffect(() => {
    getInStockOutOfStockHandler();
  }, []);
  return (
    <>
      <ul className="list-none p-0 m-0 leading-[2]">
        {availabilityData.length > 0 && availabilityData.length <= 4
          ? availabilityData.map((data, idx) => {
              return (
                <li
                  key={idx}
                  className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                  onClick={() => filteredHandler(data.type)}
                >
                  {data.type} ({data.count})
                </li>
              );
            })
          : showMoreOrLess
            ? availabilityData.slice(0, 4).map((data, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                    onClick={() => filteredHandler(data.type)}
                  >
                    {data.type} ({data.count})
                  </li>
                );
              })
            : availabilityData.map((data, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-gray-400 hover:cursor-pointer hover:text-gray-600"
                    onClick={() => filteredHandler(data.type)}
                  >
                    {data.type} ({data.count})
                  </li>
                );
              })}
        {availabilityData.length > 4 ? (
          showMoreOrLess ? (
            <span
              className="mt-2 text-sm flex items-center hover:cursor-pointer "
              onClick={() => showMoreOrLessHandler(false)}
            >
              {/* customize material ui icon using fontSize or sx={{}} */}
              <AddIcon fontSize="small" /> View more
            </span>
          ) : (
            <span
              className="mt-2 text-sm flex items-center hover:cursor-pointer"
              onClick={() => showMoreOrLessHandler(true)}
            >
              <RemoveIcon fontSize="small" /> View Less
            </span>
          )
        ) : null}
      </ul>
    </>
  );
};

export default AvailabilityTopic;
