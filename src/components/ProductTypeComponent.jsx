import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductTypeComponent = ({
  className,
  imgSrc,
  typeProduct,
  shopButton = {},
  index,
}) => {
  const bgVariants = {
    initial: { width: 0 },
    hover: { width: "200%", borderWidth: "0px" },
  };
  useEffect(() => {
    // console.log("index: ", index);
  }, [index]);
  return (
    <motion.div
      className={className}
      // remove initial/animate if you only want hover effect
      initial={{ scale: 1, opacity: 0.8 }}
      whileHover={{ scale: 1.025, opacity: 1 }}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <img
        src={imgSrc}
        alt={typeProduct}
        className="w-full h-full object-cover overflow-hidden"
      />

      <div
        id="type-product-container"
        className="absolute left-10 top-[70%] z-3"
      >
        <div id="type-product">
          <h2 className="mb-5 text-white text-5xl font-normal leading-tight">
            {typeProduct}
          </h2>

          {shopButton.active ? (
            <motion.button
              className="relative overflow-hidden mt-5 px-10 py-3  border border-white text-white max-w-[10rem]"
              initial="initial"
              whileHover="hover"
              variants={{
                initial: {},
                hover: { border: "none" },
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 h-full bg-[#63512D] z-0"
                style={{ transform: "translateX(-50%)" }}
                variants={bgVariants}
                // variants={{
                //   initial: { width: 0 },
                //   hover: { width: "100%", border: 'none' },
                // }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <span className="relative z-10">Shop Now</span>
            </motion.button>
          ) : // <button className="mt-5 px-10 py-3 bg-inherit max-w-[10rem] border-white border-1 hover:cursor-pointer relative">
          //   <motion.div
          //     className="absolute top-0 left-1/2 h-full bg-emerald-900 z-0"
          //     style={{ width: 0, transform: "translateX(-50%)" }}
          //     whileHover={{ width: "200%", zIndex: 3}}
          //     transition={{ duration: 0.5, ease: "easeOut" }}
          //   />
          //   <p className="text-sm text-white">Shop Now</p>
          // </button>
          null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductTypeComponent;
