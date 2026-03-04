import { useEffect, memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useShipping } from "../../utility/context/shippingContext";
import QuantityColumn from "../shippingTable/QuantityColumn";
import { themeColor } from "../../utility/color";
import LoadingSpinner from "../../utility/components/LoadingSpinner";

const CartList = memo(({ cartInfo }) => {
  const {
    cartListId,
    productId,
    productImg,
    productName,
    rating,
    discount,
    price,
    variants,
    color,
    size,
    quantity,
    total,
  } = cartInfo;
  const { isPending, removeItem, getTotal } = useShipping();
  const removeShippingProductHandler = (cartListId) => {
    removeItem(cartListId);
  };

  // useEffect(() => {
  //   console.log(cartInfo);
  // }, [cartInfo]);
  return (
    <div
      id="cart-list"
      className="py-3 w-full  sm:relative sm:h-45 md:h-55 lg:h-[50] xl:h-70 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden sm:flex sm:justify-between"
    >
      <div className="relative w-full h-full sm:w-[50%] lg:w-[60%] bg-gray-100 overflow-hidden group  sm:flex sm:items-center ">
        <div id="cart-img" className=" w-full full sm:w-[50%] sm:h-full">
          <img
            src={`${import.meta.env.VITE_ECOMMERCE_DOMAIN}${productImg}`}
            alt={productName}
            className="w-full h-full object-cover scale-75 sm:scale-80 transform transition-transform duration-300 ease-in-out group-hover:scale-90"
          />
          {discount > 0 && (
            <span className="base absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              -{discount}%
            </span>
          )}
        </div>
        <div id="cart-info" className="p-4 sm:p-0 flex flex-col items-center">
          <h3 className="font-medium text-gray-900 text-md sm:text-sm sm:text-center mb-2 line-clamp-2">
            {productName}{" "}
            <span
              style={{
                color: themeColor[color.toLowerCase()]?.bg,
              }}
            >
              ({color}, {size})
            </span>
          </h3>
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
                        sm: 20,
                        md: 25,
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
                        sm: 20,
                        md: 25,
                      },
                    }}
                  />
                ) : (
                  <StarOutlineIcon
                    key={val}
                    sx={{
                      fontSize: {
                        xs: 20,
                        sm: 20,
                        md: 25,
                      },
                    }}
                  />
                );
              })}
          </div>
          <div className="flex items-center gap-2 mb-4">
            {discount > 0 ? (
              <>
                <div className="text-md sm:text-sm  text-red-400 line-through">${price.toFixed(2)}</div>
                <div className="text-md sm:text-sm">${(price - (price * discount) / 100).toFixed(2)}</div>
              </>
            ) : (
              <div className="text-md sm:text-sm">${price.toFixed(2)}</div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:w-1/2 sm:h-full lg:h-[100%] sm:flex sm:flex-col lg:flex-row sm:justify-center sm:items-center ">
        <div id="total" className="w-full h-full sm:h-[30%] lg:h-[20%] flex justify-center items-center">
          <div className="mb-3 lg:mb-0 w-[80%] sm:w-[100%] flex justify-between sm:justify-center sm:items-center sm:gap-3 font-semibold sm:text-sm md:text-lg lg:text-xl">
            <h3 className="base text-gray-700 font-bold ">Total:</h3>
            {isPending ? <LoadingSpinner /> : <h3 className="base text-gray-700 font-bold">${getTotal(cartListId)}</h3>}
          </div>
        </div>
        <div id="action" className="w-full h-full sm:h-[20%] lg:h-[20%] flex justify-center ">
          <div className="w-[80%]">
            <QuantityColumn cartListId={cartListId} customStyle={"h-full rounded-sm"} />
          </div>
        </div>
      </div>
      <button
        onClick={() => removeShippingProductHandler(cartListId)}
        className="hidden sm:flex absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 items-center justify-center bg-gray-200 rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-200 z-10 hover:cursor-pointer"
        title="Remove from cartList"
      >
        <DeleteIcon
          sx={{
            fontSize: {
              sm: "medium",
              xl: "large",
            },
          }}
          className="text-gray-600"
        />
      </button>
    </div>
  );
});

export default CartList;
