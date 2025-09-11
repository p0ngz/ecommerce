/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
const typeProducts = [
  {
    type: "Earring",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/collections/4.jpg?crop=center&height=450&v=1729845890&width=450",
  },
  {
    type: "Necklace",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/collections/2.jpg?crop=center&height=450&v=1729846016&width=450",
  },
  {
    type: "Rings",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/collections/1.jpg?crop=center&height=450&v=1729845853&width=450",
  },
  {
    type: "Bracelets",
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/collections/cate-1.jpg?crop=center&height=450&v=1729845833&width=450",
  },
];
const TypeProducts = ({ pageType, currentPage = "products" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTypeProductsMobile, setShowTypeProductsMobile] = useState();
  const [current, setCurrent] = useState(0);
  const [isFromPrevious, setIsFromPrevious] = useState(false);
  const [isFromNext, setIsFromNext] = useState(false);
  const goPrevious = () => {
    setCurrent((c) => (c === 0 ? typeProducts.length - 1 : c - 1));
    setIsFromPrevious(true);
    setIsFromNext(false);
  };
  const goNext = () => {
    setCurrent((c) => (c === typeProducts.length - 1 ? 0 : c + 1));
    setIsFromPrevious(false);
    setIsFromNext(true);
  };
  const navigateHandler = (page) => {
    const urlNavigate = page.toLowerCase();
    navigate(`/products/${urlNavigate}`);
  };

  useEffect(() => {
    setShowTypeProductsMobile(() => {
      const findType =
        pageType === "products"
          ? typeProducts[0]
          : typeProducts.find((item) => item.type === pageType);
      return findType;
    });
  }, []);
  useEffect(() => {
    // console.log("showTypeProductsMobile: ", showTypeProductsMobile);
    // check index
  }, [showTypeProductsMobile]);
  return (
    <div
      id="type-products-container"
      className=" w-full px-3 relative flex justify-center"
    >
      <button
        id="arrow-left"
        onClick={() => goPrevious()}
        className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-white/80 rounded-full shadow hover:cursor-pointer"
      >
        &#8592;
      </button>
      <button
        id="arrow-right"
        onClick={() => goNext()}
        className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-white/80 rounded-full shadow hover:cursor-pointer"
      >
        &#8594;
      </button>
      <div
        id="type-products"
        className="hidden w-[80%] sm:grid px-10 grid-cols-4 gap-5"
      >
        {typeProducts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center hover:cursor-pointer"
            onClick={() => navigateHandler(item.type)}
          >
            <img
              src={item.imgSrc}
              alt={item.type}
              className={`w-full h-auto object-cover rounded-md ${currentPage === item.type ? "shadow-lg" : ""}`}
            />
            <span className={`mt-2 text-center ${currentPage === item.type ? "font-bold" : ""}`}>{item.type}</span>
          </div>
        ))}
      </div>
      <div id="type-products-mobile" className="sm:hidden w-[75%]">
        {isFromPrevious ? (
          <AnimatePresence mode="wait">
            <motion.img
              src={typeProducts[current].imgSrc}
              alt={typeProducts[current].type}
              className="w-full h-auto object-cover rounded-md"
              onClick={() => navigateHandler(typeProducts[current].type)}
              key={current}
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
              variants={{
                initial: { x: -300, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { x: 300, opacity: 0 },
                transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
              }}
            ></motion.img>
          </AnimatePresence>
        ) : isFromNext ? (
          <AnimatePresence mode="wait" key={current}>
            <motion.img
              key={current}
              src={typeProducts[current].imgSrc}
              alt={typeProducts[current].type}
              className="w-full h-auto object-cover rounded-md"
              onClick={() => navigateHandler(typeProducts[current].type)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition="transition"
              variants={{
                initial: { x: 300, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                exit: { x: 300, opacity: 0 },
                transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
              }}
            ></motion.img>
          </AnimatePresence>
        ) : (
          <img
            src={typeProducts[current].imgSrc}
            alt={typeProducts[current].type}
            className="w-full h-auto object-cover rounded-md"
            onClick={() => navigateHandler(typeProducts[current].type)}
          />
        )}
        {/* from above animation can refactor to this 
          <AnimatePresence mode="wait">
              <motion.img
              key={current}
              src={typeProducts[current].imgSrc}
              alt={typeProducts[current].type}
              initial={{ x: isFromPrevious ? -300 : 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isFromPrevious ? 300 : -300, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1], // smooth easing
              }}
               className="w-full h-auto object-cover rounded-md"
              />
          </AnimatePresence> */}
      </div>
    </div>
  );
};

export default TypeProducts;
