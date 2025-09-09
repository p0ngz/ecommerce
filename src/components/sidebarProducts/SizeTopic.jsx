import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const sizeData = [
  { size: "S", label: "Small" },
  { size: "M", label: "Medium" },
  { size: "L", label: "Large" },
];
const SizeTopic = () => {
  const [checked, setChecked] = useState(Array(sizeData.length).fill(true));

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

  return (
    <>
      <FormGroup>
        <FormControlLabel
          defaultChecked
          label={checked.every((item) => item === false) ? "ALL Sizes (default)" : "ALL Sizes"}
          control={
            <Checkbox
              fontSize="small"
              checked={checked.every((item) => item === true) || checked.every((item) => item === false)}
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
