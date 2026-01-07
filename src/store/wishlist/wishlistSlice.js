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
      const wishlists = response?.data?.wishlists;
      if (!wishlists || wishlists.length === 0) {
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
      const wishlistByUserId = response?.data;

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
        bodyData: {
          userID,
          detail,
        },
      });
      const createdWishlist = response?.data?.wishlist;
      if (!createdWishlist) {
        console.error("Error creating wishlist");
      }
      return createdWishlist;
    } catch (err) {
      console.error("Error creating wishlist: ", err);
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
