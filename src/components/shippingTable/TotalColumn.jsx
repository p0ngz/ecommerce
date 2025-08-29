import React, { useState, useEffect } from "react";
import { useShipping } from "../../contexts/shippingContext";
const TotalColumn = ({ id }) => {
  const { getTotal } = useShipping();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotal(id));
  }, [id, getTotal]);
  return (
    <div
      id="total-column"
      className="w-full h-[20%]  flex justify-center items-center"
    >
      <p className="number sm:text-lg md:text-lg xl:text-xl">$ {total}</p>
    </div>
  );
};

export default TotalColumn;
