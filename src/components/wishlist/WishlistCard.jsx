import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { capitalizeHandler } from "../../utility/capitalizeHandler";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
const WishlistCard = ({
  imgSrc,
  titleProduct,
  discount,
  rating,
  reviewCount,
  description,
  price,
  type,
  dateAdded,
  status,
  stockQuantity,
  colors,
  sizes,
  material,
  brand,
  isNew,
  isFavorite,
  lastPriceChange,
  category,
  weight,
  restockDate,
  customizable,
  engraving,
}) => {
  const totalPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);
  return (
    <div
      id="wishlist-card"
      className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div id="wishlist-card-img" className="relative w-full h-[50%] group overflow-hidden rounded-lg">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-300 ease-in-out"
        />
        <div
          id="discount-card"
          className="absolute top-5 left-5 px-5 rounded-md bg-orange-500 text-white shadow-lg shadow-orange-300/50"
        >
          <span className="base text-white text-sm">{discount > 0 && `${discount}%`}</span>
        </div>
        {status === "out_of_stock" && (
          <div
            id="status-stock"
            className={`absolute ${
              discount > 0 ? "top-15" : "top-5"
            } left-5 px-5 rounded-md bg-red-500 text-white shadow-lg shadow-red-300/50`}
          >
            <span className="base text-white text-sm">Out of Stock</span>
          </div>
        )}
        <div id="filter-bg" className="absolute inset-0  transition-colors duration-500 group-hover:bg-black/30"></div>
      </div>
      <div id="wishlist-card-info" className="w-full [50%] px-4 py-5 flex flex-col items-start gap-3">
        <div className="w-full flex justify-between ">
          <div id="left" className="flex flex-col justify-center gap-1">
            <span className="text-lg font-semibold text-gray-500">{category}</span>
            <span className="text-sm italic text-gray-500">{brand}</span>
          </div>
          <div id="right" className="flex flex-col justify-center items-end gap-1">
            <span className="text-sm font-semibold text-gray-500">{capitalizeHandler(type)}</span>
            <span className="base text-sm text-gray-500">Added {format(new Date(dateAdded), "yyyy-MM-d")}</span>
          </div>
        </div>
        <h3 id="title-wishlist-product" className="text-lg ">
          {titleProduct}
        </h3>
        <div id="rating-wishlist-product" className="mb-2 flex justify-center">
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
          <div className="flex items-center gap-1 ml-2">
            <span className="base text-sm font-medium text-gray-700">({rating})</span>
            <span className="base text-sm text-gray-500">{reviewCount} reviews</span>
          </div>
        </div>
        <div id="price-wishlist-product">
          {discount > 0 ? (
            <div className="flex items-center gap-4">
              <span className="base text-3xl font-extralight text-gray-500">${totalPrice}</span>
              <span className="base text-2xl font-extralight text-gray-300 line-through">${price}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="base text-3xl font-extralight text-gray-500">${price}</span>
            </div>
          )}
        </div>
      </div>
      <div id="wishlist-card-action" className="w-full px-4 py-4 flex item-center gap-5">
        <button
          id="add-to-cart"
          className="flex-shrink w-full bg-black text-white rounded-md py-1 hover:cursor-pointer hover:bg-gray-800 transition-color duration-300"
        >
          Add to Cart
        </button>
        <button
          id="remove-from-wishlist"
          className="p-2 rounded-md hover:cursor-pointer hover:bg-red-500 group transition-color duration-300 ease-in-out"
        >
          <DeleteForeverOutlinedIcon className="text-black group-hover:text-white transition-color duration-300 ease-in-out" />
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;

WishlistCard.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  titleProduct: PropTypes.string.isRequired,
  discount: PropTypes.number,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  dateAdded: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["in_stock", "out_of_stock", "low_stock"]).isRequired,
  stockQuantity: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  material: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  isFavorite: PropTypes.bool,
  lastPriceChange: PropTypes.string,
  category: PropTypes.string.isRequired,
  weight: PropTypes.string,
  restockDate: PropTypes.string,
  customizable: PropTypes.bool,
  engraving: PropTypes.arrayOf(PropTypes.string),
};
