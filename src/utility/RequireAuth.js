import { useState, useEffect, createElement } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/authContext";
import useRefreshToken from "./useRefreshToken";

const RequireAuth = () => {
  const { auth, isLoading, setIsLoading } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is login or register page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const accessToken = auth?.accessToken || localStorage.getItem("accessToken");
    setIsLoading(true);

    if (isAuthPage && accessToken) {
      navigate("/", { replace: true });
      return;
    }

    if (!isAuthPage && !isLoading && !isRefreshing && !accessToken) {
      const verifyRefreshToken = async () => {
        try {
          setIsRefreshing(() => true);
          await refresh();
        } catch (err) {
          console.error("error refreshing token: ", err);
          if (isMounted) {
            navigate("/login", {
              state: { from: location },
              replace: true,
            });
          }
        } finally {
          if (isMounted) {
            setIsRefreshing(() => false);
          }
        }
      };

      verifyRefreshToken();
    }

    setIsMounted(false);
    setIsLoading(false);
  }, [auth, isAuthPage, isLoading, isRefreshing, navigate, location, refresh, isMounted, setIsLoading]);

  const isAuthenticated = auth?.accessToken || localStorage.getItem("accessToken");

  // Allow access to login/register pages without authentication
  // For other pages, require authentication
  return isAuthPage || isAuthenticated ? createElement(Outlet) : null;
};

export default RequireAuth;
