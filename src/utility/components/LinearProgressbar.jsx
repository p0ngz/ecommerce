import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  //   color for background
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    // for dark mode
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[400],
    }),
  },
  //   color for progress bar
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#22c55e",
    // for dark mode
    ...theme.applyStyles("dark", {
      backgroundColor: "#16a34a",
    }),
  },
}));

const LinearProgressbar = ({ currentProcess }) => {
  const [valueProgress, setValueProgress] = useState(0);
  const valueProgressHandler = (status) => {
    switch (status) {
      case "OrderPlaced":
        return 25;
      case "Processing":
        return 50;
      case "Shipped":
        return 75;
      case "Delivered":
        return 100;
      case "Cancelled":
        return 0; 
      default:
        return 0; 
    }
  };

  useEffect(() => {
    const value = valueProgressHandler(currentProcess);
    setValueProgress(value);
  }, [currentProcess]);
  return (
    <>
      <BorderLinearProgress variant="determinate" value={valueProgress} />
    </>
  );
};

export default LinearProgressbar;
