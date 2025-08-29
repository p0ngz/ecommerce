import React from "react";
import { ShippingProvider } from "../contexts/shippingContext";
import { UserInfoProvider } from "../contexts/userInfoContext";
import ShippingComponent from "../components/ShippingComponent";

const ShippingPage = () => {
  return (
    <UserInfoProvider>
      <ShippingProvider>
        <ShippingComponent />
      </ShippingProvider>
    </UserInfoProvider>
  );
};

export default ShippingPage;
