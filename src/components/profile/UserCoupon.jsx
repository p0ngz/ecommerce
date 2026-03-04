import { useState, useEffect, useCallback, memo } from "react";
import CouponList from "./CouponList";
import { useUserCouponStore } from "../../store/userCoupon/userCouponStore";
import { useShallow } from "zustand/shallow";

const UserCoupon = memo(() => {
  const [couponList, setCouponList] = useState([]);
  const { getUserCouponByUserId } = useUserCouponStore(
    useShallow((state) => {
      return {
        getUserCouponByUserId: state.getUserCouponByUserId,
      };
    })
  );

  // Transform new API data to match old structure expected by CouponList component
  const transformCouponData = (apiCoupons) => {
    return apiCoupons.map((item) => {
      const coupon = item.coupon;

      // Determine status: "claimed" → "Available", "used" → "Used", "expired" → "Expired"
      let transformedStatus = "Available";
      if (item.status === "used") {
        transformedStatus = "Used";
      } else if (item.status === "expired") {
        transformedStatus = "Expired";
      } else if (item.status === "claimed") {
        // Check if coupon is actually expired by date
        const now = new Date();
        const validUntil = new Date(coupon.validUntil);
        const validFrom = new Date(coupon.validFrom);
        if (validUntil < now) {
          transformedStatus = "Expired";
        } else if (validFrom > now) {
          transformedStatus = "Waiting";
        } else {
          transformedStatus = "Available";
        }
      }

      // Create title based on discount type and value
      let title = "";
      if (coupon.discountType === "percentage") {
        title = `${coupon.discountValue}% OFF`;
      } else if (coupon.discountType === "fixed") {
        title = `$${coupon.discountValue} OFF`;
      } else if (coupon.discountType === "shipping") {
        title = "FREE SHIPPING";
      }

      return {
        id: item._id,
        code: coupon.code,
        title: title,
        description: coupon.description,
        expiresAt: coupon.validUntil,
        status: transformedStatus,
        minTotalPrice: coupon.minimumPrice,
        discount: coupon.discountValue,
        discountType: coupon.discountType,
        // Additional fields from new API
        couponID: coupon.couponID,
        couponName: coupon.couponName,
        maxDiscountAmount: coupon.maxDiscountAmount,
        usageCount: item.usageCount,
        userUsageLimit: item.userUsageLimit,
        claimedAt: item.claimedAt,
        validFrom: coupon.validFrom,
        isActive: coupon.isActive,
      };
    });
  };

  const getUserCouponByUserIdHandler = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }
    const coupons = await getUserCouponByUserId(userId);
    console.log("Raw API coupons:", coupons);
    // Transform the API data before setting state
    const transformedCoupons = transformCouponData(coupons);
    console.log("Transformed coupons:", transformedCoupons);
    setCouponList(transformedCoupons);
  }, [getUserCouponByUserId]);
  useEffect(() => {
    getUserCouponByUserIdHandler();
  }, [getUserCouponByUserIdHandler]);
  return (
    <div id="user-coupon-container" className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3">
      {couponList.length > 0 ? (
        <>
          <h2 className="font-semibold text-xl">Available Coupons</h2>
          <div className="md:grid md:grid-cols-2 gap-2 lg:grid-cols-4 2xl:grid-cols-6">
            {couponList.map((coupon) => {
              return <CouponList couponInfo={coupon} key={coupon.id} />;
            })}
          </div>
        </>
      ) : (
        <h2 className="text-gray-400">No coupons available...</h2>
      )}
    </div>
  );
});

export default UserCoupon;
