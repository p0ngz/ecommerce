/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { useFilteredProducts } from "../../utility/context/filterProductsContext";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";
import ColorElement from "./ColorElement";
import { themeColor } from "../../utility/color";
const ColorTopic = () => {
  // eslint-disable-next-line no-unused-vars
  const [colorData, setColorData] = useState([]);
  const [chooseColorList, setChooseColorList] = useState([]);
  const { filteredProductsHandler } = useFilteredProducts();
  const { getAllColorsProduct } = useProductStore(
    useShallow((state) => ({
      getAllColorsProduct: state.getAllColorsProduct,
    }))
  );
  const filteredHandler = (filterData) => {
    filteredProductsHandler("color", filterData);
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
  const getAllColorsHandler = async () => {
    const colors = await getAllColorsProduct();
    if (colors && colors.length > 0) {
      const mapped = colors.map((color) => ({
        color,
        hex: themeColor[color.toLowerCase()]?.bg || "#cccccc",
      }));
      setColorData(mapped);
    }
  };
  useEffect(() => {
    filteredHandler(chooseColorList);
  }, [chooseColorList]);
  useEffect(() => {
    getAllColorsHandler();
  }, []);
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
