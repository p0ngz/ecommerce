import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import CardProduct from "./CardProduct";
const exampleResult = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    price: 100,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    price: 65,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    price: 90,
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 0,
    rating: 3,
    titleProduct: "Dainty Chain Bracelet",
    price: 80,
  },
];
const SearchModalComponent = ({
  searchModalState = false,
  sendStateToParent,
}) => {
  const [searchText, setSearchText] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [resultProductList, setResultProductList] = useState([]);
  //   function
  const closeSearchModalHandler = () => {
    setOpenSearchModal(false)
    setSearchText("")
  };
  const searchTextHandler = (val) => {
    setSearchText(val);
  };

  useEffect(() => {
    const filterResult = exampleResult.filter((product) => {
      if (searchText === "") {
        return false;
      }
      return product.titleProduct
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    if (filterResult) {
      setResultProductList(filterResult);
    }
  }, [searchText]);
  useEffect(() => {
    setOpenSearchModal(searchModalState);
  }, [searchModalState]);
  useEffect(() => {
    if (!openSearchModal) {
      sendStateToParent(false);
    }
  }, [openSearchModal]);
  return (
    <div id="modal-search" className="absolute">
      <Modal
        open={openSearchModal}
        onClose={closeSearchModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          id="modal-search-container"
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-h-[90vh] size-auto px-10 py-3 bg-white rounded-md overflow-y-scroll"
        >
          <div
            id="search-modal-action"
            className="w-full flex justify-end"
          >
            <motion.button
              className="mb-3 p-2 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 hover:text-gray-600 transition hover:cursor-pointer"
              aria-label="Close searchModal"
              whileHover="hover"
              onClick={() => closeSearchModalHandler()}
            >
              <motion.span className="block w-3 h-3 relative ">
                <motion.span
                  className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400 rotate-45 -translate-x-1/2 -translate-y-1/2"
                  variants={{
                    initial: { rotate: 45 },
                    hover: { rotate: -45 },
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
                <motion.span
                  className="absolute left-1/2 top-1/2 w-4 h-0.5 bg-gray-400  -rotate-45 -translate-x-1/2 -translate-y-1/2"
                  variants={{
                    initial: { rotate: -45 },
                    hover: { rotate: 45 },
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </motion.span>
            </motion.button>
          </div>
          <div id="search-container" className="mb-10">
            <TextField
              id="outlined-basic"
              label="search"
              variant="outlined"
              className="w-full h-full"
              value={searchText}
              onChange={(e) => searchTextHandler(e.target.value)}
            />
          </div>
          <div
            id="detail-container"
            className="flex justify-between items-center"
          >
            {resultProductList.length === 0 ? (
              <p>No results</p>
            ) : resultProductList.length === 1 ? (
              <p>
                <span className="number">1</span> result
              </p>
            ) : (
              <p>
                <span className="number">{resultProductList.length}</span>{" "}
                results
              </p>
            )}
            <button
              className="hover:cursor-pointer  disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={resultProductList.length === 0}
            >
              View All
            </button>
          </div>
          <Divider sx={{ borderColor: "#e5e7eb" }} />
          <div
            id="result-container"
            className="mt-10 block md:grid md:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {resultProductList.map((result, index) => {
              return (
                <CardProduct
                  key={index}
                  imgSrc={result.imgSrc}
                  discount={result.discount}
                  rating={result.rating}
                  titleProduct={result.titleProduct}
                  price={result.price}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchModalComponent;
