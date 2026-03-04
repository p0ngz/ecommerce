import axios from "axios";

// axios instance
// public route api

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_ECOMMERCE_API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `${import.meta.env.VITE_ECOMMERCE_API_KEY}`,
  },
});
// private route api
export const privateAxiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_ECOMMERCE_API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `${import.meta.env.VITE_ECOMMERCE_API_KEY}`,
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && !config.headers["Authorization"]) {
    try {
      const tokenData = JSON.parse(token);
      const actualToken = tokenData.token || token;
      config.headers["Authorization"] = `Bearer ${actualToken}`;
      console.log("config headers: ", config.headers);
    } catch {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});
privateAxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token && !config.headers["Authorization"]) {
      try {
        const tokenData = JSON.parse(token);
        const actualToken = tokenData.token || token;
        config.headers["Authorization"] = `Bearer ${actualToken}`;
      } catch {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxiosClient.interceptors.response.use(
  (response) => response,
  // if error
  async (err) => {
    console.log("Response err: ", err);
    const prevRequest = err?.config;
    console.log("Prev request: ", prevRequest);
    if (err?.response?.status === 401 && !prevRequest.sent) {
      prevRequest._retry = true;

      try {
        // try to refresh token
        const refreshResponse = await axiosClient.post("/refresh");
        console.log("refreshResponse: ", refreshResponse);
        const newAccessToken = refreshResponse?.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return privateAxiosClient(prevRequest);
        }
      } catch (refreshError) {
        console.error("Refresh Error: ", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        localStorage.removeItem("roles");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
