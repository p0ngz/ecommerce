import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBag";

const CardNewProduct = ({
  imgSrc,
  discount,
  rating,
  titleProduct,
  price,
  sendDataToModal,
}) => {
  const [cardHover, setCardHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToModal, setDataToModal] = useState(null);
  const cardHoverHandler = (state) => {
    setCardHover(state);
  };
  const setOpenModalHandler = () => {
    setOpenModal(true);
    setDataToModal({
      imgSrc: imgSrc,
      titleProduct: titleProduct,
      price: price,
      discount: discount,
      rating: rating,
    });

  };
  useEffect(() => {
    if (openModal) {
      setOpenModalHandler();
    sendDataToModal({ data: dataToModal, open: openModal });

    }
  }, [openModal]);
  return (
    <div
      id="card-new-product"
      className="border border-gray-300 rounded-xl  overflow-hidden group"
      onMouseEnter={() => cardHoverHandler(true)}
      onMouseLeave={() => cardHoverHandler(false)}
    >
      <div
        id="img-card-product"
        className="bg-gray-200 rounded-t-xl relative overflow-hidden"
      >
        <img
          src={imgSrc}
          alt={titleProduct}
          className="w-full h-full object-cover rounded-t-xl z-1"
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
          className="
          absolute left-0 right-0 bottom-0 
          bg-zinc-950 text-white p-4 
          text-center
          translate-y-full group-hover:translate-y-0
          transition-transform duration-500 ease-in-out
        "
          onClick={() => setOpenModalHandler()}
        >
          <p className="text-sm uppercase hover:cursor-pointer">Quick View</p>
        </div>
        <AnimatePresence>
          {cardHover && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center gap-3"
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
        className="py-10 flex flex-col justify-center items-center"
      >
        <div id="rating-container" className="mb-2 flex">
          { rating && [1, 2, 3, 4, 5].map((val) => {
            return rating - val > 0.5 ? (
              <StarIcon key={val} className="text-orange-400" />
            ) : val <= rating ? (
              <StarHalfIcon key={val} className="text-orange-400" />
            ) : (
              <StarOutlineIcon key={val} />
            );
          })}
        </div>
        <div id="title-card-product" className="mb-2 title-product uppercase text-center">
          {titleProduct}
        </div>
        <div id="price-product" className="mb-2 text-xl flex gap-3">
          {discount > 0 ? (
            <>
              <div className="text-red-400 line-through">${price}</div>
              <div>${(price - (price * discount) / 100)}</div>
            </>
          ) : (
            <div>${price}</div>
          )}
        </div>
        <div id="color-product" className="flex gap-3">
          <div className="rounded-full w-6 h-6 bg-gray-300 hover:cursor-pointer"></div>
          <div className="rounded-full w-6 h-6 bg-orange-200 hover:cursor-pointer"></div>
        </div>
      </div>
    </div>
  );
};

export default CardNewProduct;
