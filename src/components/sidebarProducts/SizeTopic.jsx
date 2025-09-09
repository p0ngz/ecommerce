import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useFilteredProducts } from "../../contexts/filterProductsContext";

const sizeData = [
  { size: "S", label: "Small" },
  { size: "M", label: "Medium" },
  { size: "L", label: "Large" },
];
const SizeTopic = () => {
  const [checked, setChecked] = useState(Array(sizeData.length).fill(true));
  const { setFilteredData } = useFilteredProducts();

  const checkedAllHandler = (event) => {
    const isChecked = event.target.checked;
    const updatedChecked = checked.map(() => isChecked);
    setChecked(updatedChecked);
  };
  const checkedHandler = (event, idx) => {
    const updatedChecked = [...checked];
    updatedChecked[idx] = event.target.checked;
    setChecked(updatedChecked);
  };
  useEffect(() => {
    const data = {
      type: "size",
      filter: checked.every((item) => item === true) ? "All" : sizeData
        .filter((item, idx) => checked[idx])
        .map((item) => item.size),
    };
    console.log('data: ', data)
    setFilteredData(data)
  }, [checked]);
  return (
    <>
      <FormGroup>
        <FormControlLabel
          defaultChecked
          label={
            checked.every((item) => item === false)
              ? "ALL Sizes (default)"
              : "ALL Sizes"
          }
          control={
            <Checkbox
              fontSize="small"
              checked={
                checked.every((item) => item === true) ||
                checked.every((item) => item === false)
              }
              disabled={checked.every((item) => item === false)}
              onChange={checkedAllHandler}
            />
          }
        />
        {sizeData.map((size, idx) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  fontSize="small"
                  checked={checked[idx]}
                  onChange={(event) => checkedHandler(event, idx)}
                />
              }
              label={size.label}
              key={idx}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default SizeTopic;
