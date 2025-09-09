import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";

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
  const [chooseColorList, setChooseColorList] = useState([]);
  const receiveColor = useCallback((color, isChecked) => {
    console.log('55555')
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
    console.log("chooseColorList: ", chooseColorList);
  }, [chooseColorList]);
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {colorData.map((item, idx) => (
          <ColorElement key={idx} item={item} sendColorToParent={receiveColor} />
        ))}
      </Box>
    </>
  );
};

export default ColorTopic;
