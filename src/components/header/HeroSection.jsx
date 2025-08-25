import React from "react";
import { motion } from "framer-motion";
const HeroSection = () => {
  // set for background animation
  const bgVariants = {
    initial: { width: 0 },
    hover: { width: "200%", borderWidth: "0px" },
  };
  return (
    <div id="background-hero" className="w-full">
      <div id="bg-1" className="w-full h-screen p-0 relative">
        <img
          src="https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-1.jpg?crop=center&height=960&v=1730091392&width=1920"
          alt="bg-1"
          className="w-full h-full object-cover"
        />
        <div
          id="bg1-text"
          className="absolute left-10 top-1/2 -translate-y-1/2 min-w-20 min-h-20 flex flex-col justify-start"
        >
          <h2 className="mb-5 text-4xl font-normal leading-tight">
            Elegance With <br></br>Classic Jewelry Pieces
          </h2>
          <p className="mb-5">Freshness and brightness for the face...</p>
          {/* <button className="mt-5 py-3 bg-inherit max-w-[10rem]  border-gray-800 border-1 ">
            <p className="text-sm">Shop Now</p>
          </button> */}
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
      <div id="bg-2" className="w-full h-screen p-0 relative">
        <img
          src="https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-3.jpg?crop=center&height=960&v=1730091392&width=1920"
          alt="bg-2"
          className="w-full h-full object-cover"
        />
        <div
          id="bg2-text"
          className="absolute left-5 top-1/2 -translate-y-1/2 min-w-20 min-h-20 flex flex-col justify-start"
        >
          <h2 className="mb-5 text-4xl font-normal leading-tight">
            Elegance With <br></br>Classic Jewelry Pieces
          </h2>
          <p className="mb-5">Freshness and brightness for the face...</p>
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
      <div id="bg-3" className="w-full h-screen p-0 relative">
        <img
          src="https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-2.jpg?crop=center&height=960&v=1730091392&width=1920"
          alt="bg-3"
          className="w-full h-full object-cover"
        />
        <div
          id="bg3-text"
          className="absolute left-5 top-1/2 -translate-y-1/2 min-w-20 min-h-20 flex flex-col justify-start"
        >
          <h2 className="mb-5 text-4xl font-normal leading-tight">
            Elegance With <br></br>Classic Jewelry Pieces
          </h2>
          <p className="mb-5">Freshness and brightness for the face...</p>
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
  );
};

export default HeroSection;
