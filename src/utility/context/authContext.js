import { createContext, createElement, useContext, useState, useEffect } from "react";
import { privateAxiosClient } from "../../config/axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (userData) => {
    const response = await privateAxiosClient.post("/auth", userData);
    setAuth({
      userId: response.data.user.id,
      username: response.data.user.username,
      roles: response.data.user.roles,
      accessToken: response.data.accessToken,
    });
    if (response.data?.user && response.data?.accessToken) {
      localStorage.setItem("userId", response?.data?.user?.userId,);
      localStorage.setItem("username", response.data?.user?.username);
      localStorage.setItem("roles", JSON.stringify(response.data?.user?.roles));
      localStorage.setItem("accessToken", response.data?.accessToken);
      window.location.href = "/";
    }
  };
  const logout = async () => {
    await privateAxiosClient.post("/logout");
    setAuth({});
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  // useEffect(() => {
  //   const accessToken = auth?.accessToken || localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     window.location.href = "/";
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [auth]);
  const value = {
    auth,
    setAuth,
    isLoading,
    setIsLoading,
    login,
    logout,
  };
  return createElement(AuthContext.Provider, { value: value }, children);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
