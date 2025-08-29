import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useShipping } from "../../contexts/shippingContext";
const ActionColumn = ({ id }) => {
  const { removeItem } = useShipping();
  const removeShippingProductHandler = () => {
    removeItem(id)
  };
  return (
    <div
      id="action-column"
      className="w-full h-[20%] flex justify-center items-center "
    >
      <DeleteOutlineIcon
        fontSize="medium"
        className="hover:cursor-pointer hover:text-red-400"
        onClick={() => removeShippingProductHandler()}
      />
    </div>
  );
};

export default ActionColumn;
