import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import HeroBackground from "../HeroBackground";
import ToggleBackground from "../ToggleBackground";
const bgData = [
  {
    imgId: 1,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-1.jpg?crop=center&height=960&v=1730091392&width=1920",
    headerTxt: "Elegance With<br></br> Classic Jewelry Pieces",
    descriptionTxt: "Freshness and brightness for the face...",
    btnText: "Shop Now",
  },
  {
    imgId: 2,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-2.jpg?crop=center&height=960&v=1730091392&width=1920",
    headerTxt: "Shimmering <br></br>RIngs For Timeless",
    descriptionTxt: "Specially Handcrafted, unique and unique.",
    btnText: "Shop Now",
  },
  {
    imgId: 3,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-3.jpg?crop=center&height=960&v=1730091392&width=1920",
    headerTxt: "Luxuriate In The<br></br> Allure Of Fine Gold",
    descriptionTxt: "Helps perfect the appearance of woman..",
    btnText: "Shop Now",
  },
];

const HeroSection = () => {
  const [currentBackground, setCurrentBackground] = useState(0); // for index of bgData
  // const [toggleBackground, setToggleBackground] = useState(false);
  const [toggleFromChild, setToggleFromChild] = useState(false);
  const [toggleIndex, setToggleIndex] = useState(null);
  const receiveToggleIndex = (index) => {
    setToggleFromChild(true);
    setToggleIndex(index);
  };
  // handle background change on interval
  useEffect(() => {
    let backgroundInterval = setInterval(() => {
      setCurrentBackground((prevIndex) =>
        prevIndex === bgData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(backgroundInterval);
  }, [currentBackground]);
  // if toggleFromChild change we do this
  useEffect(() => {
    if (
      toggleFromChild &&
      typeof toggleIndex === "number" &&
      toggleIndex >= 0 &&
      toggleIndex < bgData.length
    ) {
      setCurrentBackground(toggleIndex);
    }
  }, [toggleFromChild, toggleIndex]);
  return (
    <div id="background-hero" className="w-screen relative">
      <HeroBackground
        imgID={bgData[currentBackground].imgId}
        imgSrc={bgData[currentBackground].imgSrc}
        headerTxt={bgData[currentBackground].headerTxt}
        descriptionTxt={bgData[currentBackground].descriptionTxt}
        btnText={bgData[currentBackground].btnText}
      />

      <ToggleBackground
        countElements={bgData.length}
        activeBackground={currentBackground}
        sendToggleBackgroundIndex={receiveToggleIndex}
      />
    </div>
  );
};

export default HeroSection;
