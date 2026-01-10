import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useCartStore } from "../../store/cart/cartsStore";
import { useShallow } from "zustand/shallow";
const WishList = ({ wishlistInfo = {}, removeWProductFromWishlist }) => {
  const { _id, productImg, discount, rating, productName, price, amount } = wishlistInfo.product;
  const { createAndUpdateCartListByUserId } = useCartStore(
    useShallow((state) => {
      return {
        createAndUpdateCartListByUserId: state.createAndUpdateCartListByUserId,
      };
    })
  );
  const removeFromWishlistHandler = (productId) => {
    removeWProductFromWishlist(true, productId, productImg, productName);
  };

  const addToCartHandler = () => {
    console.log("Adding to cart:", productName);
  };

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
          onClick={() => removeFromWishlistHandler(_id)}
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

        <button
          onClick={addToCartHandler}
          disabled={amount === 0}
          className={`w-full bg-gray-900 text-white py-2.5 px-4 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors duration-200  ${
            amount === 0 ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
          }`}
        >
          {amount !== 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default WishList;
