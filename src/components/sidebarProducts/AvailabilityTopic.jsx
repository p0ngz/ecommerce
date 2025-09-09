import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFilteredProducts } from "../../contexts/filterProductsContext";

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
  const [availabilityData, setAvailabilityData] = useState([]);
  const [showMoreOrLess, setShowMoreOrLess] = useState(true);
  const { setFilteredData } = useFilteredProducts();

  const showMoreOrLessHandler = (state) => {
    setShowMoreOrLess(state);
  };
  const filteredHandler = (type, filterData) => {
    const data = {
      type: type,
      filter: filterData,
    };
    setFilteredData((prev) => {
      return { ...prev, ...data };
    });
  };
  useEffect(() => {
    setAvailabilityData(availData);
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
                  onClick={() => filteredHandler("availability", data.type)}
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
                  onClick={() => filteredHandler("availability", data.type)}

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
                  onClick={() => filteredHandler("availability", data.type)}

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
