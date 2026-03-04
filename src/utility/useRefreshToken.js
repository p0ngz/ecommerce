import { privateAxiosClient } from "../config/axios";
import { useAuth } from "./context/authContext.js";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await privateAxiosClient.get("/auth/refresh");
      console.log("response from refresh token: ", response.data);

      const newAccessToken = response?.data?.accessToken;

      setAuth((prev) => {
        return {
          ...prev,
          accessToken: newAccessToken,
        };
      });

      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error("Refresh token error: ", err.response?.data || err.message);
      setAuth({});
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");
    }
  };

  return refresh;
};

export default useRefreshToken;
