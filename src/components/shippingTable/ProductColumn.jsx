import React from "react";

const ProductColumn = ({ imgSrc, titleProduct, color, discount, price }) => {
  return (
    <div id="product-column" className="size-full flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 ">
      <div id="img-product" className="w-full h-full">
        <img src={imgSrc} alt={titleProduct} className="object-cover" />
      </div>
      <div id="detail-product" className="w-full h-full flex flex-col justify-center gap-3">
        <h3 className="text-lg font-semibold uppercase  ">{titleProduct}</h3>
        <p className="text-lg text-gray-500">{color}</p>
        <div id="price-product" className="mb-5 flex gap-3 items-center">
              {discount > 0 ? (
                <>
                  <div className="number text-xl text-gray-400 line-through">
                    ${price}
                  </div>
                  <div className="number text-xl text-[#63512D]">
                    $
                    {price -
                      (price * discount) / 100}
                  </div>
                </>
              ) : (
                <div className="number text-xl text-[#63512D]">${price}</div>
              )}
            </div>
      </div>
    </div>
  );
};

export default ProductColumn;
