import { useState, useEffect, createElement } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/authContext";
import useRefreshToken from "./useRefreshToken";
import { FullPageLoading } from "../components/LoadingComponent";

const RequireAuth = () => {
  const { auth, isLoading, setIsLoading } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setIsRefreshing(() => true);

        await refresh();
      } catch (err) {
        console.error("error refreshing token: ", err);
        if (isMounted) {
          navigate("/login", {
            state: { from: location, replace: true },
          });
        }
      } finally {
        if (!isMounted) {
          setIsRefreshing(() => false);
        }
      }
    };

    if (!isLoading && !isRefreshing) {
      const accessToken = auth?.accessToken || localStorage.getItem("accessToken");

      if (!auth?.username && !accessToken) {
        verifyRefreshToken()
          .then(() => {
            // setAuth => use auth
            const newAccessToken = auth?.accessToken || localStorage.getItem("accessToken");

            if (newAccessToken) {
              const from = location?.pathname || "/";
              navigate(from, { replace: true });
            } else {
              navigate("/login", {
                state: { from: location },
                replace: true,
              });
            }
          })
          .catch((err) => {
            console.error("verifyRefreshToken error: ", err);
          });
      }
    }
    setIsMounted(false);
    setIsLoading(false);
  }, [auth, isLoading, setIsLoading, navigate, location, refresh, isRefreshing, isMounted]);

  if (isLoading || isRefreshing) {
    return createElement(FullPageLoading, { message: "Verifying authentication..." });
  }

  const isAuthenticated = auth?.accessToken || localStorage.getItem("accessToken");

  return isAuthenticated ? createElement(Outlet) : null;
};

export default RequireAuth;
