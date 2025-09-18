export function isMobileScreen() {
  return window.innerWidth <= 640;
}

import { useEffect, useState } from "react";
export function useIsMobileScreen() {
  const [isMobile, setIsMobile] = useState(isMobileScreen());

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
