import React, { useEffect, useState, useMemo } from "react";
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
import { themeColor } from "../utility/color";
import { useWishlistStore } from "../store/wishlist/wishlistStore";
import { useCartStore } from "../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";
import { toast } from "react-toastify";
import CustomToast from "../utility/CustomToast";

const CardNewProduct = ({
  productId,
  productImg,
  discount,
  rating,
  productName,
  price,
  type,
  description,
  variants,
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { createWishlist } = useWishlistStore(
    useShallow((state) => {
      return {
        createWishlist: state.createWishlist,
      };
    })
  );
  const { createOrUpdateCartListByUserId } = useCartStore(
    useShallow((state) => ({
      createOrUpdateCartListByUserId: state.createOrUpdateCartListByUserId,
    }))
  );
  const toastHandler = (status, statusTxt, descriptionTxt, productImg, productName) => {
    if (status === "success") {
      toast.success(
        <CustomToast
          statusTxt={statusTxt}
          descriptionTxt={descriptionTxt}
          productName={productName}
          productImg={productImg}
        />,
        {
          position: "top-right",
        }
      );
    }
    if (status === "error") {
      toast.error(
        <CustomToast
          statusTxt={statusTxt}
          descriptionTxt={descriptionTxt}
          productName={productName}
          productImg={productImg}
        />,
        {
          position: "top-right",
        }
      );
    }
  };
  const colors = useMemo(() => {
    if (variants && variants.length > 0) {
      return [...new Set(variants.map((variant) => variant.color))];
    }
    return [];
  }, [variants]);

  const availableSizes = useMemo(() => {
    if (!selectedColor || !variants || variants.length === 0) return [];
    return variants
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size)
      .filter(Boolean);
  }, [selectedColor, variants]);

  const selectColorHandler = (color) => {
    if (isProductPage || isProductsPage) {
      setSelectedColor((prev) => (prev === color ? null : color));
      setSelectedSize(null);
    } else {
      setOpenModalHandler(color);
    }
  };
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
  const setOpenModalHandler = (chooseColor) => {
    setOpenModal((prev) => !prev);
    setDataToModal({
      productId: productId,
      productImg: productImg,
      productName: productName,
      price: price,
      discount: discount,
      rating: rating,
      variants: variants,
      description: description,
      chooseColor: chooseColor || null,
    });
  };
  const setFavoriteProductHandler = async () => {
    const userId = localStorage.getItem("userId");
    const wishlistBody = {
      userID: userId,
      detail: {
        productId,
      },
    };
    try {
      const response = await createWishlist(wishlistBody);
      console.log("response: ", response);
      if (response?.success) {
        toastHandler("success", "Added", "to wishlists successfully", productImg, productName);
      } else {
        const errMsg = response?.message || "to wishlists failed";
        toastHandler("error", "Failed", errMsg, productImg, productName);
      }
    } catch (err) {
      console.error("add to wishlist error: ", err);
      toastHandler("error", "Added", "to wishlists failed", productImg, productName);
    }
  };
  const goToProduct = () => {
    const typeProductLower = type.toLowerCase();
    const productNameLower = productName.split(" ").join("-").toLowerCase();
    const productData = {
      productID: productId,
      productImg,
      discount,
      rating,
      productName,
      price,
      type,
      description,
    };
    dispatch(setProduct(productData));

    navigate(`/products/${typeProductLower}/${productNameLower}`);
  };
  const addToCartListHandler = async () => {
    const userId = localStorage.getItem("userId");
    const cartListData = {
      productId,
      color: selectedColor,
      size: selectedSize,
      quantity: productCount,
      total: productCount * (price - (price * discount) / 100),
    };

    try {
      const response = await createOrUpdateCartListByUserId(userId, cartListData);
      if (response) {
        console.log("toast success");
        toastHandler("success", "Added", "to cartLists successfully", productImg, productName);
      } else {
        console.log("toast error");
        toastHandler("error", "Added", "to cartLists failed", productImg, productName);
      }
    } catch (err) {
      console.error("Error addToCartListHandler: ", err);
      console.log("toast error");

      toastHandler("error", "Added", "to cartLists failed", productImg, productName);
    }
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
      className={`relative mb-4 ${isRelateProduct ? "h-[50%] " : ""} ${
        isProductsPage || isProductPage
          ? "sm:w-full sm:h-[90%] xl:h-full sm:grid sm:grid-cols-10 sm:gap-3 border-none rounded-sm"
          : "border rounded-xl"
      }  w-[90%] h-[90%] sm:w-full sm:h-full overflow-hidden group `}
      onMouseEnter={viewState ? () => cardHoverHandler(true) : null}
      onMouseLeave={viewState ? () => cardHoverHandler(false) : null}
    >
      <div
        id="img-card-product"
        className={`h-full ${isRelateProduct ? "w-full h-full sm:h-1/2 sm:w-1/2" : ""}${
          isProductPage ? "w-full h-full lg:w-[90%] lg:col-span-4 xl:h-full" : ""
        }  ${
          isProductsPage ? "sm:w-full lg:w-[85%] sm:h-full sm:col-span-4 sm:max-h-[350px] lg:max-h-[400px]" : ""
        }${
          isProductPage ? "sm:w-full lg:w-[100%] sm:h-full sm:col-span-4 lg:col-span-6" : ""
        }sm:h-[70%] xl:h-[100%] bg-gray-200 rounded-t-xl relative overflow-hidden`}
      >
        {productImg && (
          <img
            src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${productImg}`}
            alt={productName}
            className={`${
              isProductsPage || isProductPage ? "sm:aspect-[3/2] xl:aspect-ratio-[16/9]" : ""
            } w-full h-full object-cover rounded-t-xl z-1 ${viewState || isProductsPage ? "hover:cursor-pointer" : ""}`}
            onClick={viewState || isProductsPage || isRelateProduct ? () => goToProduct() : null}
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
                isRelateProduct ? "hidden sm:flex sm:justify-center sm:gap-3" : "flex justify-center gap-3"
              } absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  ${viewState ? "" : "hidden"}`}
              // animate={{ opacity: 1, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              key="icon-group"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-indigo-500 group/bag transition-colors duration-200">
                <ShoppingBagOutlinedIcon
                  fontSize="small"
                  className="text-inherit group-hover/bag:text-white transition-colors duration-200"
                  onClick={() => setOpenModalHandler()}
                />
              </div>
              <div className="w-10 h-10 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-red-500 group/fav transition-colors duration-200">
                <FavoriteBorderIcon
                  fontSize="small"
                  className="text-inherit group-hover/fav:text-white transition-colors duration-200"
                  onClick={() => setFavoriteProductHandler()}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={`${
            isRelateProduct ? "sm:hidden" : "hidden"
          } absolute right-3 top-3  flex justify-center  flex-col gap-2`}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-indigo-500 group/bag transition-colors duration-200">
            <ShoppingBagOutlinedIcon
              fontSize="small"
              className="text-inherit group-hover/bag:text-white transition-colors duration-200"
            />
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-red-500 group/fav transition-colors duration-200">
            <FavoriteBorderIcon
              fontSize="small"
              className="text-inherit group-hover/fav:text-white transition-colors duration-200"
            />
          </div>
        </div>
      </div>
      <div
        id="info-card-product"
        className={`$ ${isRelateProduct ? "h-auto" : ""} ${
          isProductPage ? "min-h-auto lg:w-[90%] lg:col-span-5" : ""
        } ${
          isProductsPage || isProductPage ? "visibility sm:w-full sm:h-full  sm:col-span-6 lg:col-span-6" : "hidden"
        } sm:min-h-[30%] py-10 sm:flex sm:flex-col sm:items-center sm:justify-center`}
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
        <div id="title-card-product" className="mb-2 title-product uppercase text-center ">
          {productName}
        </div>
        <div id="price-product" className="mb-2 text-xl flex justify-center gap-3">
          {discount > 0 ? (
            <>
              <div className="text-md sm:text-xl  text-red-400 line-through">${price.toFixed(2)}</div>
              <div className="text-md sm:text-xl">${(price - (price * discount) / 100).toFixed(2)}</div>
            </>
          ) : (
            <div className="text-md sm:text-xl">${price}</div>
          )}
        </div>
        <div id="color-product" className="flex flex-col items-center gap-2">
          {(isProductPage || isProductsPage) && selectedColor && (
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Color: <span className="font-semibold text-gray-700">{selectedColor}</span>
            </p>
          )}
          <div className="flex justify-center gap-3">
            {colors &&
              colors.map((color) => {
                const colorFormat = themeColor[color.toLowerCase()];
                const isSelected = (isProductPage || isProductsPage) && selectedColor === color;
                return (
                  <div
                    key={color}
                    className="rounded-full w-5 h-5 sm:w-6 sm:h-6 hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                    style={{
                      backgroundColor: colorFormat?.bg || "#cccccc",
                      border: isSelected ? `3px solid #111111` : `1px solid ${colorFormat?.border || "#999999"}`,
                      outline: isSelected ? "2px solid white" : "none",
                      outlineOffset: "-4px",
                      transform: isSelected ? "scale(1.2)" : undefined,
                    }}
                    title={color}
                    onClick={() => selectColorHandler(color)}
                  ></div>
                );
              })}
          </div>
          {(isProductPage || isProductsPage) && selectedColor && availableSizes.length > 0 && (
            <div id="size-product" className="mt-2 flex flex-col items-center gap-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Size: {selectedSize && <span className="font-semibold text-gray-700">{selectedSize}</span>}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {availableSizes.map((size) => {
                  const isSelectedSize = selectedSize === size;
                  return (
                    <div
                      key={size}
                      onClick={() => setSelectedSize((prev) => (prev === size ? null : size))}
                      className={`px-3 py-1 text-xs border rounded-sm hover:cursor-pointer transition-colors duration-200 ${
                        isSelectedSize
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {(isProductsPage || isProductPage) && <Divider sx={{ mx: 2, my: 2, borderColor: "#e5e7eb" }} />}
        {/* <div id="description-card-product" className={`my-5 p-4 ${isRelateProduct ? "hidden" : "block"}`}>
          <p className="text-xs text-gray-500">{description}</p>
        </div> */}
        {(isProductPage || isProductsPage) && (
          <div className="absolute top-2 right-2 w-10 h-10 bg-gray-100 rounded-full z-3 flex items-center justify-center hover:cursor-pointer hover:bg-red-500 group/fav transition-colors duration-200">
            <FavoriteBorderIcon
              fontSize="small"
              className="text-gray-400 group-hover/fav:text-white transition-colors duration-200 "
              onClick={() => setFavoriteProductHandler()}
            />
          </div>
        )}
        {(isProductsPage || isProductPage) && (
          <div
            id="action-card-product"
            className={`w-full px-3 grid grid-cols-5  ${isProductPage ? "gap-7 sm:gap-3" : "gap-3"}`}
          >
            <div id="amount-product" className="col-span-2  min-w-30 h-10 grid grid-cols-3 border border-gray-300">
              <div
                id="decrease-product"
                className={`flex justify-center items-center  ${
                  productCount <= 0 || !selectedColor || !selectedSize
                    ? "opacity-25 pointer-events-none"
                    : "hover:cursor-pointer"
                }`}
                onClick={() => decreaseHandler()}
              >
                -
              </div>
              <div
                id="show-amount-product"
                className={`flex justify-center items-center  border-x-1 border-gray-300 ${!selectedColor || !selectedSize ? "opacity-50" : ""}`}
              >
                {productCount}
              </div>
              <div
                id="increase-product"
                className={`flex justify-center items-center ${!selectedColor || !selectedSize ? "opacity-50 pointer-events-none" : "hover:cursor-pointer"} `}
                onClick={() => increaseHandler()}
              >
                +
              </div>
            </div>
            <div id="add-to-cart" className="col-span-3  min-w-35 h-10 flex justify-center items-center rounded-sm">
              <button
                className={`w-full h-full  hover:bg-black text-white rounded-sm  transition-color duration-300 ${!selectedColor || !selectedSize || productCount <= 0 ? "opacity-50 pointer-events-none bg-gray-300" : "opacity-100 bg-gray-500 hover:cursor-pointer"}`}
                onClick={() => addToCartListHandler()}
              >
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
