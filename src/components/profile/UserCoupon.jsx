import React from "react";
import CouponList from "./CouponList";
const couponListData = [
  {
    id: 1,
    code: "HOLIDAY50",
    title: "50% OFF",
    description: "Get 50% off on orders above $150",
    expiresAt: "December 31, 2025",
    status: "Available",
    minOrder: 150,
    discount: 50,
    discountType: "percentage",
  },
  {
    id: 2,
    code: "NEWBIE25",
    title: "25% OFF",
    description: "Welcome discount for new customers",
    expiresAt: "October 15, 2025",
    status: "Used",
    minOrder: 75,
    discount: 25,
    discountType: "percentage",
  },
  {
    id: 3,
    code: "FREESHIP100",
    title: "FREE SHIPPING",
    description: "Free shipping on all orders above $100",
    expiresAt: "November 30, 2025",
    status: "Available",
    minOrder: 100,
    discount: 0,
    discountType: "shipping",
  },
  {
    id: 4,
    code: "SUMMER2024",
    title: "30% OFF",
    description: "Summer sale - Get 30% off on all items",
    expiresAt: "August 31, 2024",
    status: "Expired",
    minOrder: 120,
    discount: 30,
    discountType: "percentage",
  },
  {
    id: 5,
    code: "SPRING40",
    title: "$40 OFF",
    description: "Flat $40 discount on orders above $180",
    expiresAt: "May 20, 2024",
    status: "Expired",
    minOrder: 180,
    discount: 40,
    discountType: "fixed",
  },
  {
    id: 6,
    code: "BLACKFRI20",
    title: "20% OFF",
    description: "Black Friday special - 20% off electronics",
    expiresAt: "January 15, 2025",
    status: "Expired",
    minOrder: 90,
    discount: 20,
    discountType: "percentage",
  },
  {
    id: 7,
    code: "LOYALTY15",
    title: "15% OFF",
    description: "Loyalty reward - 15% off your next purchase",
    expiresAt: "March 10, 2024",
    status: "Used",
    minOrder: 80,
    discount: 15,
    discountType: "percentage",
  },
];
const UserCoupon = () => {
  return (
    <div id="user-coupon-container" className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3">
      {couponListData.length > 0 ? (
        <>
          <h2 className="font-semibold text-xl">Available Coupons</h2>
          <div className="md:grid md:grid-cols-2 gap-2 lg:grid-cols-4 2xl:grid-cols-6">
            {couponListData.map((coupon, index) => {
              <CouponList />;
              return <CouponList couponInfo={coupon} key={index} />;
            })}
          </div>
        </>
      ) : (
        <h2 className="text-gray-400">No items in cart...</h2>
      )}
    </div>
  );
};

export default UserCoupon;
