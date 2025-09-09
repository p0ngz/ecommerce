import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const ColorElement = ({ item = {}, sendColorToParent }) => {
  const [choose, setChoose] = useState(false);
  const chooseColorHandler = () => {
    setChoose((prev) => {
      const newState = !prev;
      sendColorToParent(item.color, newState);
      return newState;
    });
  };

  return (
    /*
      - onClick={funcName} for passing function reference not pass parameter to function and not call when render 
      - onClick={() => funcName()} for passing function with parameter or call function when render
     */
    <div
      key={item.color}
      className="relative rounded-full w-10 h-10 mx-1 hover:cursor-pointer hover:border-1 hover:border-gray-300 flex justify-center items-center"
      style={{
        background: item.hex,
      }}
      title={item.color}
      onClick={chooseColorHandler}
    >
      {choose && <DoneIcon fontSize="small" sx={{ color: "white" }} />}
    </div>
  );
};

export default ColorElement;
