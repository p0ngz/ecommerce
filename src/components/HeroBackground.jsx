import React from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
// AnimatePresence for transition when mount or unmount
const HeroBackground = ({
  imgID,
  imgSrc,
  headerTxt,
  descriptionTxt,
  btnText,
}) => {
  const bgVariants = {
    initial: { width: 0 },
    hover: { width: "200%", borderWidth: "0px" },
  };
  return (
    <div
      key={imgID}
      id={`bg-${imgID}`}
      className="w-full h-screen p-0 relative"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={imgSrc}
          src={imgSrc}
          alt={`bg-${imgID}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }} // initial
          animate={{ opacity: 1 }} // when mount
          exit={{ opacity: 0 }} // when unmount
          transition={{ duration: 0.5 }} // set properties transition here
        ></motion.img>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={imgID}
          id={`bg${imgID}-text`}
          className="absolute md:left-10 lg:left-30 top-1/2 -translate-y-1/2 min-w-20 min-h-20 flex flex-col justify-start"
          initial="initial"
          animate="animate"
          exit="exit"
          transition="transition"
          variants={{
            initial: { x: -300, opacity: 0 },
            animate: { x: 30, opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.8 },
          }}
        >
          <h2 className="mb-5 text-4xl font-normal leading-tight">
            {headerTxt.split("<br></br>").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== headerTxt.split("<br></br>").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="mb-5">{descriptionTxt}</p>
          {
            <motion.button
              className="relative overflow-hidden mt-5 px-10 py-3 border border-gray-800  max-w-[10rem] hover:cursor-pointer"
              initial="initial"
              whileHover="hover"
              variants={{
                initial: { color: "black" },
                hover: { border: "none", color: "white" },
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 h-full bg-[#63512D] z-0"
                style={{ transform: "translateX(-50%)" }}
                variants={bgVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <span className="relative z-10">{btnText}</span>
            </motion.button>
          }
        </motion.div>
      </AnimatePresence>
      {/* <div
        key={`bg${imgID}-text`}
        id={`bg${imgID}-text`}
        className="absolute md:left-10 lg:left-30 top-1/2 -translate-y-1/2 min-w-20 min-h-20 flex flex-col justify-start"
      >
        <h2 className="mb-5 text-4xl font-normal leading-tight">
          {headerTxt.split("<br></br>").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx !== headerTxt.split("<br></br>").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className="mb-5">{descriptionTxt}</p>
        {
          <motion.button
            className="relative overflow-hidden mt-5 px-10 py-3 border border-gray-800  max-w-[10rem] hover:cursor-pointer"
            initial="initial"
            whileHover="hover"
            variants={{
              initial: { color: "black" },
              hover: { border: "none", color: "white" },
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 h-full bg-[#63512D] z-0"
              style={{ transform: "translateX(-50%)" }}
              variants={bgVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <span className="relative z-10">{btnText}</span>
          </motion.button>
        }
      </div> */}
    </div>
  );
};

export default HeroBackground;
