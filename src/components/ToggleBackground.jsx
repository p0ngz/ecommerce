import React, { useEffect, useState } from "react";

const ToggleBackground = ({ countElements, activeBackground, sendToggleBackgroundIndex }) => {
  const [currentActive, setCurrentActive] = useState(0);
  const [toggleBackgroundIndex, setToggleBackgroundIndex] = useState()

  const toggleBackgroundIndexHandler = (index) => {
    setToggleBackgroundIndex(index)
  }
  useEffect(() => {
    setCurrentActive(activeBackground);
    // console.log('autoCurrentActive: ', currentActive)
  }, [activeBackground, currentActive]);
  useEffect(() => {
    // console.log('toggle index: ', toggleBackgroundIndex)
    sendToggleBackgroundIndex(toggleBackgroundIndex)
  }, [toggleBackgroundIndex, sendToggleBackgroundIndex])
  return (
    <div
      id="toggle-bg"
      className=" flex lg:flex-col justify-center items-center gap-3 sm:absolute sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2 sm:top-auto sm:right-auto lg:bottom-auto lg:left-auto lg:right-10 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-3"
    >
      {Array.from({ length: countElements }).map((_, index) => {
        return (
          <div
            id={`toggle-bg-${index + 1}`}
            key={index}
            className={`w-3 h-3  border border-gray-200 rounded-full hover:scale-150 hover:cursor-pointer hover:bg-[#63512D] ${
              currentActive === index ? "bg-[#63512D]" : "bg-[#A17C69]"
            }`}
            onClick={() => toggleBackgroundIndexHandler(index)}
          ></div>
        );
      })}
    </div>
  );
};

export default ToggleBackground;
