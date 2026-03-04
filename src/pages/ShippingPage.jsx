import React from "react";
import { ShippingProvider } from "../utility/context/shippingContext";
import { UserInfoProvider } from "../utility/context/userInfoContext";
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
