import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const PromoteSection = () => {
  const bgVariants = {
    initial: { width: 0 },
    hover: { width: "200%", borderWidth: "0px" },
  };
  return (
    <div
      id="promote-container"
      //   63512D
      className="my-10 w-full sm:h-[100vh] flex flex-col sm:flex-row bg-[#F6F3EF]"
    >
      <div
        id="left-promoted-container"
        className="w-full sm:w-[50%] h-full flex justify-center items-center"
      >
        <div
          id="promote-text"
          className="w-full h-full py-10 px-10 leading-tight sm:text-start md:ps-10 md:pe-5 xl:ps-0 md:w-full xl:max-w-[50%] h-full flex flex-col justify-center"
        >
          <h2 className="mb-5 sm:mb-10 text-center sm:text-start text-2xl sm:text-4xl font-normal leading-tight">
            Chic Petal Perfection
          </h2>
          <p className="mb-5 sm:mb-10 text-center sm:text-start">
            Jewelry is favored by both men and women because it shows luxury &
            class; own aesthetic taste, affirming position…
          </p>
          <div className="flex justify-center sm:justify-start">
            {
              <motion.button
                className="relative overflow-hidden mt-5 px-10 py-3 border border-gray-800  text-black max-w-[10rem] hover:cursor-pointer"
                initial="initial"
                whileHover="hover"
                variants={{
                  initial: {},
                  hover: { border: "none", color: "white" },
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 h-full bg-[#63512D] z-0"
                  style={{ transform: "translateX(-50%)" }}
                  variants={bgVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span className="relative z-10">Shop Now</span>
              </motion.button>
            }
          </div>
        </div>
      </div>
      <div id="right-promoted-container" className="w-full sm:w-[50%] h-full">
        <img
          src="https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-11.jpg?v=1730109301&width=1200"
          alt="promoted-img"
          className="aspect-[4/5] object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default PromoteSection;
