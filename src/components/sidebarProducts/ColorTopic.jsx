import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { useFilteredProducts } from "../../contexts/filterProductsContext";

import ColorElement from "./colorElement";
const colorData = [
  {
    color: "Gold",
    hex: "#d4b710ff",
  },
  {
    color: "Silver",
    hex: "#C0C0C0",
  },
  {
    color: "Rainbow",
    hex: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  },
  {
    color: "Rose Gold",
    hex: "#cb7e89ff",
  },
];
const ColorTopic = () => {
  // eslint-disable-next-line no-unused-vars
  const [chooseColorList, setChooseColorList] = useState([]);
  const { setFilteredData } = useFilteredProducts();

  const filteredHandler = (type, filterData) => {
    const data = {
      type: type,
      filter: filterData,
    };
    setFilteredData((prev) => {
      return { ...prev, ...data };
    });
  };
  const receiveColor = useCallback((color, isChecked) => {
    setChooseColorList((prev) => {
      if (isChecked) {
        // add
        return prev.includes(color) ? prev : [...prev, color];
      } else {
        // remove
        return prev.filter((c) => c !== color);
      }
    });
  }, []);

  useEffect(() => {
    filteredHandler("color", chooseColorList);
  }, [chooseColorList]);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {colorData.map((item, idx) => (
          <ColorElement
            key={idx}
            item={item}
            sendColorToParent={receiveColor}
          />
        ))}
      </Box>
    </>
  );
};

export default ColorTopic;
