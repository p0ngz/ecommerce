import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useFilteredProducts } from "../../utility/context/filterProductsContext";
import { useProductStore } from "../../store/product/productStore";
import { useShallow } from "zustand/shallow";
function valuetext(value) {
  return <span className="description">{value}$</span>;
}

const PriceTopic = memo(() => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [value, setValue] = useState([0, maxPrice]);
  const { filteredProductsHandler } = useFilteredProducts();
  const { getMaxPriceProduct } = useProductStore(
    useShallow((state) => ({
      getMaxPriceProduct: state.getMaxPriceProduct,
    }))
  );
  const debounceRef = useRef(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const filteredHandler = (filterData) => {
    const data = {
      min: filterData[0],
      max: filterData[1],
    };
    filteredProductsHandler("price", data);
  };
  const resetHandler = () => {
    setValue([0, maxPrice]);
  };

  const getMaxPriceHandler = useCallback(async () => {
    const maxPriceProduct = await getMaxPriceProduct();
    const maxPriceValue = maxPriceProduct ?? 100;
    setMaxPrice(maxPriceValue);
    setValue([0, maxPriceValue]);
  }, [getMaxPriceProduct]);
  useEffect(() => {
    getMaxPriceHandler();
  }, [getMaxPriceHandler]);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      filteredHandler(value);
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [value]);
  return (
    <>
      <Box sx={{ width: "90%", color: "gray", margin: "0 auto" }}>
        <Typography>
          <span className="text-gray-400 text-sm underline hover:cursor-pointer" onClick={() => resetHandler()}>
            Reset
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          min={0}
          max={maxPrice}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(val) => {
            return <span className="number">$ {val}</span>;
          }}
          getAriaValueText={valuetext} // aria-valuetext for screen reader
          sx={{
            color: "#bfbfbf",
            "& .MuiSlider-thumb": {
              width: 15,
              height: 15,
              backgroundColor: "#fff",
              border: "2px solid #bfbfbf",
              "&:hover": {
                boxShadow: "0 0 0 8px rgba(0, 0, 0, 0.16)",
              },
            },
          }}
        />
        <Typography>
          Price: <span className="number text-red-400">$ {value[0].toFixed(2)}</span> -{" "}
          <span className="number text-red-400">$ {value[1].toFixed(2)}</span>
        </Typography>
      </Box>
    </>
  );
});

export default PriceTopic;
