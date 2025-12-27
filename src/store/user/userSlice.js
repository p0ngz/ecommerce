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
  registerUser: async (userData) => {
    try {
    } catch (err) {
      console.error("Error register user: ", err);
    }
  },
  loginUser: async () => {
    try {
    } catch (err) {
      console.error("Error login user: ", err);
    }
  },
  getUser: async () => {
    try {
      const response = "getUser";
      console.log("response: ", response);
    } catch (err) {
      console.error("Error getUser data: ", err);
    }
  },
  getUserByUserId: async (userId) => {
    try {
    } catch (err) {
      console.error("Error fetching user by ID: ", err);
    }
  },
  updateUser: async () => {
    try {
    } catch (err) {
      console.error("Error updating user data: ", err);
    }
  },
  deleteUser: async () => {
    try {
    } catch (err) {
      console.error("Error deleting user: ", err);
    }
  },
});
