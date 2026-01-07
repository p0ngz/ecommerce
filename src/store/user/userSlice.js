import { axiosClient } from "../../utility/axiosInstance";

const initialUserState = {
  userName: "",
  email: "",
  password: "",
  role: "",
  isActive: true,
  information: {
    userImage: "",
    firstName: "",
    lastName: "",
    address: "",
    gender: "",
    birthDate: "",
    phone: "",
  },
};

export const createUserSlice = (set, get) => ({
  user: initialUserState,
  setUser: (userData) => {
    set((state) => ({
      ...state,
      userData,
    }));
  },
  getUSer: () => {
    const user = get().user;
    return user;
  },
  getAllUser: async () => {
    try {
      const response = await axiosClient.get("/user");
      const users = response?.data;
      if (!users || users.count === 0) { //default find is array
        console.error("No users data found");
      }
      return users;
    } catch (err) {
      console.error("Error getUser data: ", err);
    }
  },
  getUserByUserId: async (userId) => {
    try {
      const response = await axiosClient.get("/user/" + userId);
      const user = response?.data;
      if (!user) { //default findOne is document or null
        console.error("No user data found for ID: ", userId);
      }
      return user;
    } catch (err) {
      console.error("Error fetching user by ID: ", err);
    }
  },
  createUser: async (userData) => {
    try {
      const response = await axiosClient.post("/user", userData);
      const newUser = response.data;

      if (!newUser) { // default create is document 
        console.error("No user data returned from server");
      }
      return newUser;
    } catch (err) {
      console.error("Error creating user: ", err);
    }
  },
  updateUserByUserId: async (userId, userData) => {
    try {
      const response = await axiosClient.put("/user/" + userId, userData);
      const updatedUser = response?.data;

      if (!updatedUser) {
        console.error("No updated user data returned from server");
      }
      return updatedUser;
    } catch (err) {
      console.error("Error updating user data: ", err);
    }
  },
  deleteUserByUserId: async (userId) => {
    try {
      const response = await axiosClient.delete("/user/" + userId);
      const deletedUser = response?.data;
      if (!deletedUser) {
        console.error("No deleted user data returned from server");
      }
      return deletedUser;
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  },
});
