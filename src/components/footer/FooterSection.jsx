import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const FooterSection = () => {
  return (
    <div
      id="footer-container"
      className="py-10 px-5 xl:px-55 leading-[1.2] sm:leading-[1.5] w-full min-h-[35vh] grid grid-cols-1 gap-7 sm:grid-cols-4"
    >
      <div id="contact-us" className="w-full h-full">
        <div id="header-text" className="mb-5">
          <h6 className="font-bold uppercase">Contact Us</h6>
        </div>
        <div id="sub-header" className="pe-3 text-wrap flex flex-col gap-2">
          <p className="sub-header-text text-md">
            Tower of London, London EC3N 4AB, United Kingdom.
          </p>
          <p className="sub-header-text text-md">(+84) 123 567 712</p>
          <p className="sub-header-text text-md">jewelryshop@gmail.com</p>
        </div>
      </div>

      <div id="customer-service" className="w-full h-full">
        <div id="header-text" className="mb-5">
          <h6 className="font-bold uppercase">CUSTOMER SERVICE</h6>
        </div>
        <div
          id="sub-header"
          className="pe-3 text-wrap flex flex-col gap-2 capitalize"
        >
          <p className="sub-header-text text-md">Faq</p>
          <p className="sub-header-text text-md">Size guide</p>
          <p className="sub-header-text text-md">Shipping</p>
          <p className="sub-header-text text-md">Order Status</p>
          <p className="sub-header-text text-md">Exchange</p>
        </div>
      </div>
      <div id="about-us" className="w-full h-full">
        <div id="header-text" className="mb-5">
          <h6 className="font-bold uppercase">About Us</h6>
        </div>
        <div
          id="sub-header"
          className="pe-3 text-wrap flex flex-col gap-2 capitalize"
        >
          <p className="sub-header-text text-md">Our Shops</p>
          <p className="sub-header-text text-md">Contact</p>
          <p className="sub-header-text text-md">Artists</p>
          <p className="sub-header-text text-md">Local Giving</p>
          <p className="sub-header-text text-md">Press</p>
        </div>
      </div>
      <div id="join-us" className=" w-full h-full flex  flex-col items-start">
        <div id="header-text" className="mb-5">
          <h6 className="font-bold uppercase">Join Our Community</h6>
        </div>
        <div
          id="sub-header"
          className="pe-3 text-wrap flex flex-col gap-2 capitalize"
        >
          {/* normally Box render into div but we can set component = form for render into form */}
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            className="px-0"
          >
            <TextField
              id="standard-basic"
              label="Email address..."
              variant="standard"
            />
          </Box>
          {
            <motion.button
              className="relative overflow-hidden mt-3 px-10 py-3 border border-gray-800  text-black max-w-[10rem] hover:cursor-pointer"
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
                variants={{
                  initial: { width: 0 },
                  hover: { width: "200%", borderWidth: "0px" },
                }}
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

export default FooterSection;
