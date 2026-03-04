import React, {
  createElement,
  createContext,
  useContext,
  useState,
  useEffect,
  useOptimistic,
  useTransition,
  useMemo,
  useCallback,
} from "react";
import { useCartStore } from "../../store/cart/cartsStore";
import { useUserCouponStore } from "../../store/userCoupon/userCouponStore";
import { useShallow } from "zustand/shallow";

export const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const shippingPrice = 9.99; // now constant for real need to adapt to each shipping method
  const tax = 8.5;
  const [shippingData, setShippingData] = useState(null);
  const [couponList, setCouponList] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [couponId, setCouponId] = useState(null);
  const [isMatchCoupon, setIsMatchCoupon] = useState(false);

  const [isDisabledConfirm, setIsDisabledConfirm] = useState(true);
  const [optimisticShippingData, setOptimisticShippingData] = useOptimistic(shippingData, (state, action) => {
    switch (action.type) {
      case "increase":
        return state.map((item) => (item._id === action.cartListId ? { ...item, quantity: item.quantity + 1 } : item));
      case "decrease":
        return state.map((item) =>
          item._id === action.cartListId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
      case "remove":
        return state.filter((item) => item._id !== action.cartListId);
      default:
        return state;
    }
  });
  const { updateCartListByCartListId, deleteCartListByCartListId } = useCartStore(
    useShallow((state) => {
      return {
        updateCartListByCartListId: state.updateCartListByCartListId,
        deleteCartListByCartListId: state.deleteCartListByCartListId,
      };
    })
  );
  const { getUserCouponByUserId } = useUserCouponStore(
    useShallow((state) => {
      return {
        getUserCouponByUserId: state.getUserCouponByUserId,
      };
    })
  );
  const getUserCouponByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const userCouponData = await getUserCouponByUserId(userId);
    const availableCouponList = userCouponData.filter(({ coupon, status, userUsageLimit, used }) => {
      const curDate = new Date();
      return (
        new Date(coupon?.validFrom) <= curDate &&
        new Date(coupon?.validUntil) >= curDate &&
        status?.toLowerCase() === "claimed" &&
        userUsageLimit > used.length &&
        coupon?.isActive &&
        !coupon?.isDeleted
      );
    });

    setCouponList(availableCouponList);
  }, [getUserCouponByUserId]);
  // Increase quantity
  const increaseQuantity = async (cartListId) => {
    const previousData = shippingData;
    const currentItem = shippingData?.find((item) => item._id === cartListId);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + 1;
    const price = currentItem.product?.price || currentItem.price;
    const discount = currentItem.product?.discount || currentItem.discount || 0;
    const total = price * (1 - discount / 100) * newQuantity;

    startTransition(() => {
      setOptimisticShippingData({ type: "increase", cartListId });
    });

    try {
      const result = await updateCartListByCartListId(cartListId, { quantity: newQuantity, total: total });
      if (result) {
        setShippingData((prev) =>
          prev.map((item) => (item._id === cartListId ? { ...item, quantity: newQuantity } : item))
        );
      }
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      setShippingData(previousData); //rollback
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (cartListId) => {
    const previousData = shippingData;
    const currentItem = shippingData?.find((item) => item._id === cartListId);
    if (!currentItem || currentItem.quantity <= 1) return;

    const newQuantity = currentItem.quantity - 1;
    const price = currentItem.product?.price || currentItem.price;
    const discount = currentItem.product?.discount || currentItem.discount || 0;
    const total = price * (1 - discount / 100) * newQuantity;

    startTransition(() => {
      setOptimisticShippingData({ type: "decrease", cartListId });
    });

    try {
      // Make API call here
      const result = await updateCartListByCartListId(cartListId, { quantity: newQuantity, total: total });
      if (result) {
        setShippingData((prev) =>
          prev.map((item) => (item._id === cartListId && item.quantity > 1 ? { ...item, quantity: newQuantity } : item))
        );
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      setShippingData(previousData); //rollback
    }
  };

  //   get Quantity each shipping
  const getQuantity = (id) => {
    if (id) {
      const item = optimisticShippingData?.find((item) => item.id === id);
      return item ? item.quantity : 0;
    }
    throw new Error("ID is required to get quantity");
  };

  //   get Total each shipping
  const getTotal = useCallback(
    (cartListId) => {
      const item = optimisticShippingData?.find((item) => item._id === cartListId);
      return item ? item.product.price * (1 - item.product.discount / 100) * item.quantity : 0.0;
    },
    [optimisticShippingData]
  );

  const beforeDiscountCouponTotal = useCallback(() => {
    const totalBeforeDiscountCoupon = optimisticShippingData?.reduce((acc, item) => {
      const priceTotal = (item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity;
      return acc + priceTotal;
    }, 0);
    return Number(totalBeforeDiscountCoupon).toFixed(2);
  }, [optimisticShippingData]);

  const getTotalSummary = useCallback(() => {
    const beforeCouponCodeTotal = optimisticShippingData?.reduce((acc, item) => {
      const priceTotal = (item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity;
      return acc + priceTotal;
    }, 0);
    if (isMatchCoupon) {
      const coupon = matchCouponCode(couponCode)?.coupon;
      // percentage and fixed
      if (coupon?.discountType === "percentage") {
        return beforeCouponCodeTotal * (1 - coupon?.discountValue / 100) * (1 - tax / 100) + shippingPrice;
      } else if (coupon?.discountType === "fixed") {
        return (beforeCouponCodeTotal - coupon?.discountValue) * (1 + tax / 100) + shippingPrice;
      }
    }
    return beforeCouponCodeTotal * (1 + tax / 100) + shippingPrice;
  }, [optimisticShippingData, isMatchCoupon, couponCode, tax, shippingPrice]);

  // Remove item
  const removeItem = async (cartListId) => {
    const previousData = shippingData;

    startTransition(() => {
      setOptimisticShippingData({ type: "remove", cartListId });
    });

    try {
      // Make API call here
      const result = await deleteCartListByCartListId(cartListId);

      if (result) {
        setShippingData((prev) => prev.filter((item) => item._id !== cartListId));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      setShippingData(previousData);
    }
  };

  //   Match Coupon Code
  const matchCouponCode = useCallback(
    (couponCode) => {
      return couponList.find((coupon) => {
        return coupon.coupon.code === couponCode;
      });
    },
    [couponList]
  );
  const discountValue = useMemo(() => {
    if (isMatchCoupon) {
      const coupon = matchCouponCode(couponCode)?.coupon;
      if (coupon?.discountType === "percentage") {
        return (beforeDiscountCouponTotal() * coupon?.discountValue) / 100;
      } else if (coupon?.discountType === "fixed") {
        return coupon?.discountValue;
      }
    } else {
      return 0;
    }
  }, [isMatchCoupon, couponCode, beforeDiscountCouponTotal, matchCouponCode]);
  useEffect(() => {
    getUserCouponByUserIdHandler();
  }, [getUserCouponByUserIdHandler]);

  useEffect(() => {
    console.log("couponList: ", couponList);
  }, [couponList]);
  return createElement(
    ShippingContext.Provider,
    {
      value: {
        // state
        shippingData: optimisticShippingData, // Use optimistic state for UI
        selectedPaymentMethod,
        couponCode,
        isMatchCoupon,
        // formDataOrder,
        shippingPrice,
        tax,
        isPending,
        isDisabledConfirm,
        shippingAddress,
        discountValue,
        couponId,
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
        // setFormDataOrder,
        setIsDisabledConfirm,
        setShippingAddress,
        setCouponId,
      },
    },
    children
  );
};

// Custom hook for easy usage
export const useShipping = () => useContext(ShippingContext);
