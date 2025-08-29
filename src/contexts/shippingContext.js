import React, {
  createElement,
  createContext,
  useContext,
  useState,
} from "react";

// Example initial data (you can import or fetch this)
const initialShippingData = [
  {
    id: 1,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    color: "silver",
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    price: 100,
    quantity: 2,
  },
  {
    id: 2,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    color: "gold",
    rating: 4,
    titleProduct: "Butterfly Ring",
    price: 65,
    quantity: 2,
  },
  {
    id: 3,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    color: "gold",
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    price: 90,
    quantity: 1,
  },
  {
    id: 4,
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 0,
    color: "rainbow",
    rating: 3,
    titleProduct: "Dainty Chain Bracelet",
    price: 80,
    quantity: 3,
  },
//   setDiscountPercentage
];
const couponList = [
  { code: "NEA-7KQ4", discountType: "percent", discount: 15 },
  { code: "NEA-2M9X", discountType: "percent", discount: 20 },
  { code: "NEA-PL8C", discountType: "percent", discount: 30 },
  { code: "NEA-Z1RT", discountType: "percent", discount: 40 },
];
export const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingData, setShippingData] = useState(initialShippingData);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [isMatchCoupon, setIsMatchCoupon] = useState(false);
  const [formDataOrder, setFormDataOrder] = useState({
    shippingData: {},
    paymentMethod: "",
    couponCode: "",
    beforeDiscountTotal: 0,
    total: 0,
  });
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(true);
  // Increase quantity
  const increaseQuantity = (id) => {
    setShippingData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setShippingData((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //   get Quantity each shipping
  const getQuantity = (id) => {
    if (id) {
      const item = shippingData.find((item) => item.id === id);
      return item ? item.quantity : 0;
    }
    throw new Error("ID is required to get quantity");
  };

  //   get Total each shipping
  const getTotal = (id) => {
    if (id) {
      const item = shippingData.find((item) => item.id === id);
      return item
        ? item.price * (1 - item.discount / 100) * item.quantity
        : 0.0;
    }
  };

  const beforeDiscountCouponTotal = () => {
    return shippingData?.reduce((acc, item) => {
      const priceTotal =
        (item.price - (item.price * item.discount) / 100) * item.quantity;
      return acc + priceTotal;
    }, 0);
  };
  const getTotalSummary = () => {
    const beforeCouponCodeTotal = shippingData?.reduce((acc, item) => {
      const priceTotal =
        (item.price - (item.price * item.discount) / 100) * item.quantity;
      return acc + priceTotal;
    }, 0);
    if (isMatchCoupon) {
      const matchCoupon = matchCouponCode(couponCode);
      return beforeCouponCodeTotal * (1 - matchCoupon[0]?.discount / 100);
    }
    return beforeCouponCodeTotal;
  };

  // Remove item
  const removeItem = (id) => {
    setShippingData((prev) => prev.filter((item) => item.id !== id));
  };
  //   Match Coupon Code
  const matchCouponCode = (couponCode) => {
    return couponList.filter((code) => {
      return code.code === couponCode;
    });
  };

  return createElement(
    ShippingContext.Provider,
    {
      value: {
        // state
        shippingData,
        selectedPaymentMethod,
        couponCode,
        isMatchCoupon,
        formDataOrder,
        // function
        setShippingData,
        increaseQuantity,
        decreaseQuantity,
        getQuantity,
        getTotal,
        removeItem,
        setSelectedPaymentMethod,
        setCouponCode,
        matchCouponCode,
        getTotalSummary,
        setIsMatchCoupon,
        beforeDiscountCouponTotal,
  setFormDataOrder,
  isDisabledConfirm,
  setIsDisabledConfirm
      },
    },
    children
  );
};

// Custom hook for easy usage
export const useShipping = () => useContext(ShippingContext);
