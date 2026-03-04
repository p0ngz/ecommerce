import React, { useState, useEffect, memo, useCallback, useOptimistic, useTransition } from "react";
import WishList from "./WishList";
import { useWishlistStore } from "../../store/wishlist/wishlistStore";
import { useShallow } from "zustand/shallow";
import CustomToast from "../../utility/CustomToast";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const UserWishlist = memo(() => {
  const [wishlist, setWishlist] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [wishlistOptimistic, setWishlistOptimistic] = useOptimistic(wishlist, (_, newWishlist) => newWishlist);
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
  const { getWishlistByUserId, deletedWishlistByUserIdAndProductId } = useWishlistStore(
    useShallow((state) => {
      return {
        getWishlistByUserId: state.getWishlistByUserId,
        deletedWishlistByUserIdAndProductId: state.deletedWishlistByUserIdAndProductId,
      };
    })
  );

  const getWishlistByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const wishlists = await getWishlistByUserId(userId);
    setWishlist(wishlists?.wishlists);
  }, [getWishlistByUserId]);

  const receiveRemoveProductFromWishlist = (removed = false, productId, productImg, productName) => {
    if (removed) {
      startTransition(async () => {
        setWishlistOptimistic(wishlistOptimistic.filter((item) => item.product._id !== productId));

        try {
          const userId = localStorage.getItem("userId");
          const response = await deletedWishlistByUserIdAndProductId(userId, productId);
          if (response) {
            setWishlist((prev) => prev.filter((item) => item.product._id !== productId));
            toastHandler("success", "Removed", "from wishlists successfully", productImg, productName);
          } else {
            toastHandler("error", "Removed", "from wishlists failed", productImg, productName);
          }
        } catch (err) {
          console.error("rollback remove product from wishlist error: ", err);
          toastHandler("error", "Removed", "from wishlists failed", productImg, productName);
        }
      });
    }
  };
  useEffect(() => {
    getWishlistByUserIdHandler();
  }, [getWishlistByUserIdHandler]);
  return (
    <div
      id="user-wishlist-container"
      className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3"
    >
      {!isPending && wishlistOptimistic.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold">Wishlist</h2>
          <div id="wishlist-container" className="sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistOptimistic.map((item) => {
              console.log("item: ", item);
              return (
                <WishList
                  key={item.product._id}
                  wishlistInfo={item}
                  removeWProductFromWishlist={receiveRemoveProductFromWishlist}
                />
              );
            })}
          </div>
        </>
      ) : (
        <span className="text-gray-400">No wishlist found...</span>
      )}
    </div>
  );
});

export default UserWishlist;
