import { useState, useEffect, useMemo, memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useCartStore } from "../../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";
import { themeColor } from "../../utility/color";
import { toast } from "react-toastify";
import CustomToast from "../../utility/CustomToast";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const WishList = memo(({ wishlistInfo = {}, removeWProductFromWishlist }) => {
  const { _id: productId, productImg, discount, rating, productName, price, amount } = wishlistInfo.product;
  const [chooseColor, setChooseColor] = useState(null);
  const [chooseSize, setChooseSize] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [inStock, setInStock] = useState(0);

  const sizes = useMemo(() => {
    const filterFromColor = wishlistInfo.product.variants.filter((variant) => variant.color === chooseColor);
    return filterFromColor.map((variant) => variant.size);
  }, [chooseColor, wishlistInfo.product.variants]);
  const quantity = useMemo(() => {
    if (chooseSize && chooseColor) {
      const quantityFromSizeAndColor = wishlistInfo.product.variants.find(
        (variant) => variant.color === chooseColor && variant.size === chooseSize
      );
      return quantityFromSizeAndColor.inStock;
    }
  }, [chooseSize, chooseColor, wishlistInfo.product.variants]);
  const colors = useMemo(() => {
    if (wishlistInfo.product.variants && wishlistInfo.product.variants.length > 0) {
      return [...new Set(wishlistInfo.product.variants.map((variant) => variant.color))];
    }
  }, [wishlistInfo]);
  const decreaseHandler = () => {
    if (quantityProduct > 0) {
      setQuantityProduct((prev) => prev - 1);
    }
  };
  const increaseHandler = () => {
    setQuantityProduct((prev) => prev + 1);
  };
  const colorPickerHandler = (color) => {
    setChooseColor(color);

    const quantity = wishlistInfo.product.variants.find((variant) => variant.color === color).inStock;
    setInStock(quantity);
  };
  const chooseSizeHandler = (size) => {
    setChooseSize(size);
  };
  const { createOrUpdateCartListByUserId } = useCartStore(
    useShallow((state) => {
      return {
        createOrUpdateCartListByUserId: state.createOrUpdateCartListByUserId,
      };
    })
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
  const removeFromWishlistHandler = (productId) => {
    removeWProductFromWishlist(true, productId, productImg, productName);
  };
  const addToCartListHandler = async () => {
    const userId = localStorage.getItem("userId");
    const cartListData = {
      productId,
      color: chooseColor,
      size: chooseSize,
      quantity: quantityProduct,
      total:
        quantityProduct *
        (wishlistInfo.product.price - (wishlistInfo.product.price * wishlistInfo.product.discount) / 100),
    };
    try {
      const response = await createOrUpdateCartListByUserId(userId, cartListData);
      if (response) {
        console.log("toast success");
        toastHandler(
          "success",
          "Added",
          "to cartLists successfully",
          wishlistInfo.product.productImg,
          wishlistInfo.product.productName
        );
      } else {
        console.log("toast error");
        toastHandler(
          "error",
          "Added",
          "to cartLists failed",
          wishlistInfo.product.productImg,
          wishlistInfo.product.productName
        );
      }
    } catch (err) {
      console.error("Error addToCartListHandler: ", err);
      console.log("toast error");

      toastHandler(
        "error",
        "Added",
        "to cartLists failed",
        wishlistInfo.product.productImg,
        wishlistInfo.product.productName
      );
    }
  };
  useEffect(() => {
    if (chooseColor) {
      const quantity = wishlistInfo.product.variants.find((variant) => variant.color === chooseColor).inStock;
      setInStock(quantity);
    }
  }, [chooseColor, wishlistInfo.product.variants]);
  return (
    <div
      id="wish-list"
      className="relative w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="h-60 sm:min-h-60 bg-gray-100 overflow-hidden group">
        <img
          src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${productImg}`}
          alt={productName}
          className="relative w-full h-full object-cover aspect-[4/3] scale-90 transform transition-transform duration-300 ease-in-out group-hover:scale-100"
        />
        {discount && (
          <span className="base absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => removeFromWishlistHandler(productId)}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors duration-200 z-10 hover:cursor-pointer"
          title="Remove from wishlist"
        >
          <DeleteIcon fontSize="medium" className="text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center">
        {/* Product Title */}
        <h3 className="font-medium text-gray-900 text-md mb-2 line-clamp-2">{productName}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
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
          <span className="base text-sm text-gray-600">{rating}</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          {discount > 0 ? (
            <>
              <div className="text-md sm:text-xl  text-red-400 line-through">${price.toFixed(2)}</div>
              <div className="text-md sm:text-xl">${(price - (price * discount) / 100).toFixed(2)}</div>
            </>
          ) : (
            <div className="text-md sm:text-xl">${price.toFixed(2)}</div>
          )}
        </div>

        <div id="size-color-product" className="w-full flex justify-center gap-5">
          {/* Color Section */}
          <div id="color-product" className="mb-5 flex flex-col items-center">
            <div id="show-color" className="mb-3">
              Color: {chooseColor || "Select a color..."}
            </div>
            <div id="pick-color" className="flex gap-3">
              {colors &&
                colors.map((color) => {
                  const colorFormat = themeColor[color.toLowerCase()];
                  return (
                    <div
                      key={color}
                      className="rounded-full w-6 h-6 md:w-8 md:h-8 hover:cursor-pointer hover:scale-110 transition-transform duration-200"
                      style={{
                        backgroundColor: colorFormat?.bg || "#cccccc",
                        border: `1px solid ${colorFormat?.border || "#999999"}`,
                        outline: `${color === chooseColor ? `2px solid ${colorFormat?.ring}` : "none"}`,
                      }}
                      title={color}
                      onClick={() => colorPickerHandler(color)}
                    ></div>
                  );
                })}
            </div>
          </div>
          {/* Size Section */}
          {chooseColor && (
            <div id="sizes-product" className="mb-5 flex flex-col justify-center items-center">
              <div id="show-size" className="mb-3">
                Size: {chooseSize || "Select a size..."}
              </div>
              <div id="pick-size" className="flex gap-3 flex-wrap">
                {chooseColor &&
                  sizes.length > 0 &&
                  sizes.map((sizeItem) => {
                    const isSelected = sizeItem === chooseSize;
                    return (
                      <div
                        key={sizeItem}
                        id="size-product"
                        className={`
                        
                          min-w-[2.5rem] px-3 py-2 text-center text-sm font-medium
                          rounded-md border-2 cursor-pointer
                          transition-all duration-200
                          hover:scale-105 hover:shadow-md
                          ${
                            isSelected
                              ? "bg-black text-white border-black shadow-md"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }
                        `}
                        onClick={() => chooseSizeHandler(sizeItem)}
                      >
                        {sizeItem}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        {/* show inStock */}
        {chooseColor && chooseSize && (
          <div
            id="stock-product"
            className={`mb-5 flex gap-3 text-sm ${inStock > 0 ? "text-green-700" : "text-red-700"}`}
          >
            {inStock > 0 ? (
              <>
                <CheckCircleOutlinedIcon fontSize="small"></CheckCircleOutlinedIcon>
                <p>
                  In Stock (<span className="number">{quantity}</span>)
                </p>
              </>
            ) : (
              <>
                <CancelIcon fontSize="small"></CancelIcon>
                <span>Out of Stock</span>
              </>
            )}
          </div>
        )}
        {/* action product */}
        <div id="action-product" className="grid grid-cols-5 gap-10 sm:gap-5">
          <div id="amount-product" className="col-span-2 p-0 min-w-30 h-10 grid grid-cols-3 border border-gray-300">
            <div
              id="decrease-product"
              className={`flex justify-center items-center  ${
                quantityProduct <= 0 || !chooseColor || !chooseSize
                  ? "pointer-events-none opacity-25"
                  : "hover:cursor-pointer"
              }`}
              onClick={() => decreaseHandler()}
            >
              -
            </div>
            <div id="show-amount-product" className="flex justify-center items-center  border-x-1 border-gray-300">
              {quantityProduct}
            </div>
            <div
              id="increase-product"
              className={`flex justify-center items-center  ${
                (sizes && quantityProduct >= quantity) || !chooseColor || !chooseSize
                  ? "pointer-events-none opacity-25"
                  : "hover:cursor-pointer"
              }`}
              onClick={() => increaseHandler()}
            >
              +
            </div>
          </div>
          <div id="add-to-cart" className="col-span-3 p-0 min-w-35 h-10 flex justify-center items-center rounded-sm">
            <button
              className={`w-full h-full bg-black text-white rounded-sm ${
                chooseColor && chooseSize && quantityProduct ? "" : "opacity-50 pointer-events-none"
              } hover:cursor-pointer hover:bg-gray-800 transition-colors duration-200`}
              onClick={() => addToCartListHandler()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WishList;
