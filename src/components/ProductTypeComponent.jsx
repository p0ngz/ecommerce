import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobileScreen } from "../utility/isMobile";
const ProductTypeComponent = ({
  className,
  imgSrc,
  typeProduct,
  shopButton = {},
  index,
}) => {
  const isMobile = useIsMobileScreen();
  const bgVariants = {
    initial: { width: 0 },
    hover: { width: "200%", borderWidth: "0px" },
  };
  const navigate = useNavigate();
  const goToProductType = () => {
    const url = typeProduct.toLowerCase();
    navigate(`/products/${url}`);
  };

  return (
    <motion.div
      className={className}
      // remove initial/animate if you only want hover effect
      initial={{ scale: 1, opacity: 0.8 }}
      whileHover={{ scale: 1.025, opacity: 1 }}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={isMobile ? () => goToProductType() : null}
    >
      <img
        src={imgSrc}
        alt={typeProduct}
        className="w-full h-full object-cover overflow-hidden"
      />

      <div
        id="type-product-container"
        className={`absolute left-10 top-[80%] sm:left-10 sm:top-[55%] lg:left-10 lg:top-[75%]  ${
          index === 2 || index === 3
            ? "xl:left-10 xl:top-[60%]"
            : "xl:left-10 xl:top-[80%]"
        }  z-3`}
      >
        <div id="type-product">
          <h2
            className={`mb-5 lg:mb-7 xl:mb-3 text-white text-5xl lg:text-5xl font-normal leading-tight`}
          >
            {typeProduct}
          </h2>

          {shopButton.active ? (
            <motion.button
              className="relative hidden sm:block overflow-hidden  px-10 py-3  border border-white text-white min-w-[10rem] hover:cursor-pointer"
              initial="initial"
              whileHover="hover"
              variants={{
                initial: {},
                hover: { border: "none" },
              }}
              onClick={() => goToProductType()}
            >
              <motion.div
                className="absolute top-0 left-1/2 h-full bg-[#63512D] z-0"
                style={{ transform: "translateX(-50%)" }}
                variants={bgVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <span className="relative lg:text-md z-10">Shop Now</span>
            </motion.button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductTypeComponent;
