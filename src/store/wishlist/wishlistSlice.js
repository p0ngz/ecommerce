import WishList from "../../components/profile/WishList";
import { axiosClient } from "../../config/axios";
const initialWishlistState = [];
export const createWishlistSlice = (set, get) => ({
  wishlist: initialWishlistState,
  setWishlist: (wishlistData) => {
    set((state) => ({
      ...state,
      wishlistData,
    }));
  },
  getWishlist: () => {
    const wishlists = get().wishlist;
    return wishlists;
  },
  getAllWishlists: async (filter) => {
    try {
      let response;
      if (filter && Object.keys(filter).length > 0) {
        response = await axiosClient.get("/wishlist", { params: { ...filter } });
      } else {
        response = await axiosClient.get("/wishlist");
      }
      const wishlists = response?.data;
      if (!wishlists || wishlists.count === 0) {
        console.error("No wishlists found");
      }

      return wishlists;
    } catch (err) {
      console.error("Error getWishlist data: ", err);
    }
  },
  getWishlistByUserId: async (userId) => {
    try {
      const response = await axiosClient.get("/wishlist/user/" + userId);
      const wishlistByUserId = response?.data?.wishlist[0];
      if (!wishlistByUserId || wishlistByUserId.length === 0) {
        console.error("No wishlist data found for User ID: ", userId);
      }

      return wishlistByUserId;
    } catch (err) {
      console.error("Error fetching wishlist by user ID: ", err);
    }
  },
  createWishlist: async (wishlistData) => {
    try {
      const { userID, detail } = wishlistData;
      const response = await axiosClient.post("/wishlist", {
        userID,
        detail,
      });
      const createdWishlist = response?.data?.wishlist;
      if (!createdWishlist) {
        console.error("Error creating wishlist");
        console.log(response?.data?.message);
      }
      return { success: true, data: createdWishlist };
    } catch (err) {
      console.error("Error creating wishlist: ", err);
      const message = err?.response?.data?.message || "Something went wrong";
      return { success: false, message };
    }
  },
  deleteWishlistByUserId: async (userId) => {
    //delete all
    try {
      const response = await axiosClient.delete("/wishlist/user/" + userId);
      const deletedWishlists = response?.data?.wishlist;
      if (!deletedWishlists) {
        console.error("Failed to delete wishlist for User ID: ", userId);
      }

      return deletedWishlists;
    } catch (err) {
      console.error("Error deleting wishlist by user ID: ", err);
    }
  },
  deletedWishlistByUserIdAndProductId: async (userId, productId) => {
    try {
      const response = await axiosClient.delete("/wishlist/user/" + userId + "/product/" + productId);
      const deletedWishlist = response?.data?.wishlist;
      if (!deletedWishlist) {
        console.error("Failed to delete wishlist for User ID and Product ID: ", userId, productId);
      }

      return deletedWishlist;
    } catch (err) {
      console.error("Error deleting wishlist by user ID and product ID: ", err);
    }
  },
});
