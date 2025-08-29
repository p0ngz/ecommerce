import React from "react";
import { useShipping } from "../../contexts/shippingContext";
const QuantityColumn = ({ id }) => {
  const { shippingData, increaseQuantity, decreaseQuantity } = useShipping();
  const quantityItem = shippingData.find((item) => item.id === id);
  const productQuantity = quantityItem ? quantityItem.quantity : 0;

  return (
    <div
      id="quantity-column"
      className="w-full h-[20%] border border-gray-400 flex justify-center items-center"
    >
      <div
        id="decrease-product"
        className={`w-1/3 h-full flex justify-center items-center hover:cursor-pointer ${
          productQuantity <= 0 ? "pointer-events-none opacity-50" : ""
        }`}
        onClick={() => decreaseQuantity(id)}
        disabled={productQuantity <= 0}

      >
        <p className="number md:text-xl lg:text-2xl xl:text-3xl">-</p>
      </div>
      <div
        id="show-amount-product"
        className="w-1/3 h-full number md:text-xl border-x border-gray-400 lg:text-2xl xl:text-3xl col-span-4 flex justify-center items-center  border-x-1 border-gray-300"
      >
        {productQuantity}
      </div>
      <div
        id="increase-product"
        className="w-1/3 flex justify-center items-center hover:cursor-pointer "
        onClick={() => increaseQuantity(id)}
      >
        <p className="number md:text-xl lg:text-2xl xl:text-3xl">+</p>
      </div>
    </div>
  );
};

export default QuantityColumn;
