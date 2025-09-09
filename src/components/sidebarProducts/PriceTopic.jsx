import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useFilteredProducts } from "../../contexts/filterProductsContext";

function valuetext(value) {
  return <span className="description">{value}°C</span>;
}

const PriceTopic = () => {
  const [value, setValue] = useState([0, 100]);
  const { setFilteredData } = useFilteredProducts();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  const resetHandler = () => {
    setValue([0, 100]);
  };
  useEffect(() => {
    filteredHandler("price", {
      min: value[0],
      max: value[1],
    });
  }, [value]);
  return (
    <>
      <Box sx={{ width: "90%", color: "gray", margin: "0 auto" }}>
        <Typography>
          <span
            className="text-gray-400 text-sm underline hover:cursor-pointer"
            onClick={() => resetHandler()}
          >
            Reset
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
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
          Price:{" "}
          <span className="number text-red-400">$ {value[0].toFixed(2)}</span> -{" "}
          <span className="number text-red-400">$ {value[1].toFixed(2)}</span>
        </Typography>
      </Box>
    </>
  );
};

export default PriceTopic;
