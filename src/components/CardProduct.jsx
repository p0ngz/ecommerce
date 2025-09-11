import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";

const CardNewProduct = ({
  imgSrc,
  discount,
  rating,
  titleProduct,
  price,
  viewState = false,
  sendDataToModal,
  isProductsPage = false,
  description,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToModal, setDataToModal] = useState(null);
  const [product, setProduct] = useState(0);
  const decreaseHandler = () => {
    if (product > 0) {
      setProduct((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setProduct((prev) => prev + 1);
  };
  const cardHoverHandler = (state) => {
    setCardHover(state);
  };
  const setOpenModalHandler = () => {
    setOpenModal((prev) => !prev);
    setDataToModal({
      imgSrc: imgSrc,
      titleProduct: titleProduct,
      price: price,
      discount: discount,
      rating: rating,
    });
  };
  const goToProduct = () => {
    console.log("go to product page");
  };
  useEffect(() => {
    if (openModal && viewState) {
      setOpenModalHandler();
      sendDataToModal({ data: dataToModal, open: openModal });
    }
  }, [openModal]);
  return (
    <div
      id="card-new-product"
      // ${isProductsPage ? "w-full h-full" : ""}
      className={`mb-4 ${
        isProductsPage
          ? "sm:w-full sm:h-[90%] sm:grid sm:grid-cols-10 sm:gap-3 border-none rounded-sm"
          : "border rounded-xl"
      } w-[90%] h-[90%] sm:w-full sm:h-full  sm:border sm:border-gray-300   overflow-hidden group ${
        viewState ? "" : "hover:cursor-pointer"
      }`}
      onMouseEnter={viewState ? () => cardHoverHandler(true) : null}
      onMouseLeave={viewState ? () => cardHoverHandler(false) : null}
      onClick={viewState ? null : () => goToProduct()}
    >
      <div
        id="img-card-product"
        className={`h-[100%] ${
          isProductsPage ? "sm:w-full lg:w-[80%] sm:h-full sm:col-span-4" : ""
        } sm:h-[70%] bg-gray-200 rounded-t-xl relative overflow-hidden`}
      >
        <img
          src={imgSrc}
          alt={titleProduct}
          className={`${
            isProductsPage ? "sm:aspect-[3/2]" : ""
          } w-full h-full object-cover rounded-t-xl z-1`}
        />
        {discount !== 0 && (
          <div
            id="discount"
            className="absolute top-4 left-4 z-2 px-5 py-1 bg-destructive rounded text-gray-100"
          >
            -{discount}%
          </div>
        )}
        <div
          className={`
          absolute left-0 right-0 bottom-0 
          bg-zinc-950 text-white p-4 
          text-center
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500 ease-in-out
          ${viewState ? "" : "hidden"}
        `}
          onClick={() => setOpenModalHandler()}
        >
          <p className="text-sm uppercase hover:cursor-pointer">Quick View</p>
        </div>
        <AnimatePresence>
          {cardHover && (
            <motion.div
              className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center gap-3 ${
                viewState ? "" : "hidden"
              }`}
              // animate={{ opacity: 1, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              key="icon-group"
            >
              <div className="bg-white rounded-full p-3 z-3">
                <ShoppingBagOutlinedIcon
                  fontSize="small"
                  className="text-gray-600"
                />
              </div>
              <div className="bg-white rounded-full p-3 z-3">
                <FavoriteBorderIcon
                  fontSize="small"
                  className="text-gray-600"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        id="info-card-product"
        className={`${
          isProductsPage
            ? "visibility sm:w-full sm:h-full sm:col-span-6"
            : "hidden"
        } sm:min-h-[30%] py-10 sm:flex flex-col justify-center items-center`}
      >
        <div id="rating-container" className="mb-2 flex justify-center">
          {rating &&
            [1, 2, 3, 4, 5].map((val) => {
              return rating - val > 0.5 ? (
                <StarIcon
                  key={val}
                  className="text-orange-400"
                  sx={{
                    fontSize: {
                      xs: 20,
                      sm: 24,
                      md: 30,
                    },
                  }}
                />
              ) : val <= rating ? (
                <StarHalfIcon
                  key={val}
                  className="text-orange-400"
                  sx={{
                    fontSize: {
                      xs: 20,
                      sm: 24,
                      md: 30,
                    },
                  }}
                />
              ) : (
                <StarOutlineIcon
                  key={val}
                  sx={{
                    fontSize: {
                      xs: 20,
                      sm: 24,
                      md: 30,
                    },
                  }}
                />
              );
            })}
        </div>
        <div
          id="title-card-product"
          className="mb-2 title-product uppercase text-center "
        >
          {titleProduct}
        </div>
        <div
          id="price-product"
          className="mb-2 text-xl flex justify-center gap-3"
        >
          {discount > 0 ? (
            <>
              <div className="text-md sm:text-2xl  text-red-400 line-through">
                ${price}
              </div>
              <div className="text-md sm:text-2xl ">
                ${price - (price * discount) / 100}
              </div>
            </>
          ) : (
            <div>${price}</div>
          )}
        </div>
        <div id="color-product" className="flex justify-center gap-3">
          <div className="rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:cursor-pointer"></div>
          <div className="rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-orange-200 hover:cursor-pointer"></div>
        </div>
        {isProductsPage && <Divider sx={{ mx: 2, borderColor: "#e5e7eb" }} />}
        <div id="description-card-product" className="my-5  p-4">
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        {isProductsPage && (
          <div
            id="action-card-product"
            className="w-full px-3 grid grid-cols-5 gap-5"
          >
            <div
              id="amount-product"
              className="col-span-2 p-0 min-w-30 h-10 grid grid-cols-3 border border-gray-300"
            >
              <div
                id="decrease-product"
                className={`flex justify-center items-center hover:cursor-pointer ${
                  product <= 0 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => decreaseHandler()}
              >
                -
              </div>
              <div
                id="show-amount-product"
                className="flex justify-center items-center  border-x-1 border-gray-300"
              >
                {product}
              </div>
              <div
                id="increase-product"
                className="flex justify-center items-center hover:cursor-pointer "
                onClick={() => increaseHandler()}
                disabled={product <= 0}
              >
                +
              </div>
            </div>
            <div
              id="add-to-cart"
              className="col-span-3 p-0 min-w-35 h-10 flex justify-center items-center rounded-sm"
            >
              <button className="w-full h-full bg-black text-white rounded-sm">
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardNewProduct;
