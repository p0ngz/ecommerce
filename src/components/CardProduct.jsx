import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";
import { setProduct } from "../store/productSlice";
import { useDispatch } from "react-redux";
const CardNewProduct = ({
  imgSrc,
  discount,
  rating,
  titleProduct,
  price,
  type,
  description,
  viewState = false,
  sendDataToModal,
  isProductsPage = false,
  isProductPage = false,
  isRelateProduct = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardHover, setCardHover] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataToModal, setDataToModal] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const decreaseHandler = () => {
    if (productCount > 0) {
      setProductCount((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setProductCount((prev) => prev + 1);
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
    const typeProductLower = type.toLowerCase();
    const titleProductLower = titleProduct.split(" ").join("-").toLowerCase();
    const productData = {
      imgSrc,
      discount,
      rating,
      titleProduct,
      price,
      type,
      description,
    };
    dispatch(setProduct(productData));

    navigate(`/products/${typeProductLower}/${titleProductLower}`);
  };
  useEffect(() => {
    if (openModal && viewState) {
      setOpenModalHandler();
      sendDataToModal({ data: dataToModal, open: openModal });
    }
  }, [openModal]);
  useEffect(() => {}, [imgSrc]);
  return (
    <div
      id="card-new-product"
      className={`mb-4 ${isRelateProduct ? "h-[50%] " : ""} ${
        isProductsPage || isProductPage
          ? "sm:w-full sm:h-[90%] sm:grid sm:grid-cols-10 sm:gap-3 border-none rounded-sm"
          : "border rounded-xl"
      }  w-[90%] h-[90%] sm:w-full sm:h-full overflow-hidden group `}
      onMouseEnter={viewState ? () => cardHoverHandler(true) : null}
      onMouseLeave={viewState ? () => cardHoverHandler(false) : null}
    >
      <div
        id="img-card-product"
        className={`h-[100%] ${
          isRelateProduct ? "w-full h-full sm:h-[50%]" : ""
        }${isProductPage ? "h-full lg:w-[90%] lg:col-span-5" : ""}  ${
          isProductsPage || isProductPage
            ? "sm:w-full lg:w-[80%] sm:h-full sm:col-span-4 lg:col-span-5"
            : ""
        }sm:h-[70%] bg-gray-200 rounded-t-xl relative overflow-hidden`}
      >
        {imgSrc && (
          <img
            src={imgSrc}
            alt={titleProduct}
            className={`${
              isProductsPage || isProductPage ? "sm:aspect-[3/2]" : ""
            } w-full h-full object-cover rounded-t-xl z-1 ${
              viewState || isProductsPage ? "hover:cursor-pointer" : ""
            }`}
            onClick={
              viewState || isProductsPage || isRelateProduct
                ? () => goToProduct()
                : null
            }
          />
        )}
        {discount !== 0 && (
          <div
            id="discount"
            className="absolute w-10 h-5 text-xs text-center top-2 left-2 sm:w-auto sm:h-auto sm:px-5 sm:py-2 sm:text-md sm:top-4 sm:left-4 z-2  py-1 bg-destructive rounded text-gray-100"
          >
            -{discount}%
          </div>
        )}
        <div
          className={`
            ${isRelateProduct ? "hidden sm:block" : ""}
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
              className={`${
                isRelateProduct
                  ? "hidden sm:flex sm:justify-center sm:gap-3"
                  : "flex justify-center gap-3"
              } absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  ${
                viewState ? "" : "hidden"
              }`}
              // animate={{ opacity: 1, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              key="icon-group"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-indigo-500 group transition-colors duration-200">
                <ShoppingBagOutlinedIcon
                  fontSize="small"
                  className="text-inherit group-hover:text-white transition-colors duration-200"
                />
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-red-500 group transition-colors duration-200">
                <FavoriteBorderIcon
                  fontSize="small"
                  className="text-inherit group-hover:text-white transition-colors duration-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`${
            isRelateProduct ? "sm:hidden" : "hidden"
          } absolute right-3 top-3  flex justify-center flex flex-col gap-2`}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-indigo-500 group transition-colors duration-200">
            <ShoppingBagOutlinedIcon
              fontSize="small"
              className="text-inherit group-hover:text-white transition-colors duration-200"
            />
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-red-500 group transition-colors duration-200">
            <FavoriteBorderIcon
              fontSize="small"
              className="text-inherit group-hover:text-white transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div
        id="info-card-product"
        className={`$ ${
          isProductPage ? "h-full lg:w-[90%] lg:col-span-5" : ""
        } ${
          isProductsPage || isProductPage
            ? "visibility sm:w-full sm:h-full sm:col-span-6 lg:col-span-5"
            : "hidden"
        } sm:min-h-[30%] py-10 sm:flex flex-col justify-center items-center`}
      >
        <div id="rating-container" className="mb-2 flex justify-center">
          {rating &&
            [1, 2, 3, 4, 5].map((val) => {
              return rating - val > 0.5 ? (
                <StarIcon
                  key={val}
                  className="text-[#F4B350]"
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
                  className="text-[#F4B350]"
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
              <div className="text-md sm:text-xl  text-red-400 line-through">
                ${price}
              </div>
              <div className="text-md sm:text-xl">
                ${price - (price * discount) / 100}
              </div>
            </>
          ) : (
            <div className="text-md sm:text-xl">${price}</div>
          )}
        </div>
        <div id="color-product" className="flex justify-center gap-3">
          <div className="rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:cursor-pointer"></div>
          <div className="rounded-full w-5 h-5 sm:w-6 sm:h-6 bg-orange-200 hover:cursor-pointer"></div>
        </div>
        {(isProductsPage || isProductPage) && (
          <Divider sx={{ mx: 2, my: 2, borderColor: "#e5e7eb" }} />
        )}
        <div id="description-card-product" className="my-5  p-4">
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        {(isProductsPage || isProductPage) && (
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
                  productCount <= 0 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => decreaseHandler()}
              >
                -
              </div>
              <div
                id="show-amount-product"
                className="flex justify-center items-center  border-x-1 border-gray-300"
              >
                {productCount}
              </div>
              <div
                id="increase-product"
                className="flex justify-center items-center hover:cursor-pointer "
                onClick={() => increaseHandler()}
                disabled={productCount <= 0}
              >
                +
              </div>
            </div>
            <div
              id="add-to-cart"
              className="col-span-3 p-0 min-w-35 h-10 flex justify-center items-center rounded-sm"
            >
              <button className="w-full h-full bg-gray-500 hover:bg-black text-white rounded-sm hover:cursor-pointer transition-color duration-300">
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
