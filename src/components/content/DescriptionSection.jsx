/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const descriptions = [
  {
    text: `“If you’re looking for luxury products and professional service,
look no further. I had a great experience while purchasing my IWC luxury watch. I will continue to support (JN)..."`,
    author: "LUCA MORETTI ~ Musician",
  },
  {
    text: `"We only discovered this fabulous fine jeweler recently. The
premises are beautiful, and the staff is extremely knowledgeable and friendly. It’s impossible to walk out empty-handed! It is a...`,
    author: "Ann Smith ~ Ceo & Founder",
  },
  {
    text: `“I was pretty amazed by the store when I walked in. The variety of
top designers was an additional plus. I found a nice diamond necklace for my wife..."`,
    author: "Anana ~ Photographer",
  },
  {
    text: `“Couldn’t be happier with my new piece of jewelry! The design is
stunning, and the quality surpasses my expectations. It’s truly a statement piece worth cherishing"`,
    author: "Linda ~ Designer",
  },
];

const logos = [
  {
    logoId: 1,
    logoImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/bran-1.png?v=1729736273"
  },
  {
    logoId: 2,
    logoImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/bran-2.png?v=1729736280"
  },
  {
    logoId: 3,
    logoImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/bran-3.png?v=1729736281"
  },
  {
    logoId: 4,
    logoImg: "https://wpbingo-adena.myshopify.com/cdn/shop/files/bran-4.png?v=1729736281"
  },
  {
    logoId: 5,
    logoImg: "http://wpbingo-adena.myshopify.com/cdn/shop/files/brand-5.png?v=1729736281"
  },

]
const DescriptionSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c === 0 ? descriptions.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === descriptions.length - 1 ? 0 : c + 1));

  return (
    <div className="px-10 py-20 w-full h-[70%] bg-[#F6F3EF]">
      <div
        id="description-container"
        className="mb-5 w-full h-[70%] flex items-center justify-center"
      >
        <div
          id="description"
          className="p-0 w-full min-h-[160px] flex items-center justify-center gap-10 overflow-hidden"
        >
          <div className="relative w-full lg:w-[75%] xl:w-[75%] 2xl:w-[50%] mx-auto min-h-[160px] max-h-full flex items-center justify-center overflow-hidden">
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-white/80 rounded-full shadow hover:cursor-pointer"
            >
              &#8592;
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute px-10 w-full h-full flex flex-col items-center justify-center hover:cursor-grab"
                // drag="x"
                // dragConstraints={{ left: 0, right: 0 }}
                // onDragEnd={(e, info) => {
                //   if (info.offset.x < -50) next();
                //   else if (info.offset.x > 50) prev();
                // }}
              >
                <p className="mb-6 text-md sm:text-xl md:text-2xl text-center leading-[1.5]">
                  {descriptions[current].text}
                </p>
                <span className="text-gray-400 text-md sm:text-xl md:text-2xl text-md uppercase">
                  {descriptions[current].author}
                </span>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-white/80 rounded-full shadow hover:cursor-pointer"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      <div
        id="logo-container"
        className=" w-full h-full flex justify-center items-center gap-5 md:gap-10 xl:gap-40"
      >
        {
          logos.map((logo) => {
            return <div key={logo.logoId}>
              <img src={logo.logoImg} alt={logo.logoId} className={`object-cover ${logo.logoId === 0 ? "pb-2" : ""}`}/>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default DescriptionSection;
