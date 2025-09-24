import React, { useRef, useEffect } from "react";
import OrdersComponent from "../components/orders/OrdersComponent";

const OrdersPage = () => {
  const pageRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    // pageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div id="orders-page" ref={pageRef}>
      <OrdersComponent />
    </div>
  );
};

export default OrdersPage;
