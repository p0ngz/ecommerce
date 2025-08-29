import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const WishlistPage = () => {
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("qr");

  return (
    // <div
    //   id="wishlist=page"
    //   className="px-5 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]"
    // >
    //   <h2 id="wishlist-title" className="mb-3 text-3xl">
    //     WishList
    //   </h2>
    //   <div id="wishlist-breadcrumb" className="breadcrumb">
    //     <Breadcrumbs
    //       aria-label="breadcrumb"
    //       separator=">"
    //       sx={{
    //         // styling separator
    //         "& .MuiBreadcrumbs-separator": {
    //           color: "inherit",
    //           fontWeight: "bold",
    //           fontSize: "1rem",
    //           mx: 1,
    //         },
    //       }}
    //     >
    //       <Link
    //         underline="hover"
    //         color="inherit"
    //         href="/"
    //         sx={{
    //           "&:hover": {
    //             color: "black",
    //           },
    //         }}
    //       >
    //         Home
    //       </Link>

    //       <Typography sx={{ color: "text.primary" }}>wishlist</Typography>
    //     </Breadcrumbs>
    //   </div>
    // </div>
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      {/* Shipping Method */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
        <div className="grid gap-4">
          <button
            onClick={() => setShipping("standard")}
            className={`p-4 border rounded-xl text-left ${
              shipping === "standard"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">Standard Delivery</p>
            <p className="text-sm text-gray-500">3–5 business days</p>
          </button>

          <button
            onClick={() => setShipping("express")}
            className={`p-4 border rounded-xl text-left ${
              shipping === "express"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">Express Delivery</p>
            <p className="text-sm text-gray-500">1–2 business days</p>
          </button>

          <button
            onClick={() => setShipping("pickup")}
            className={`p-4 border rounded-xl text-left ${
              shipping === "pickup"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">Pickup at Store</p>
            <p className="text-sm text-gray-500">Free of charge</p>
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="grid gap-4">
          <button
            onClick={() => setPayment("qr")}
            className={`p-4 border rounded-xl text-left ${
              payment === "qr"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">QR Code</p>
            <p className="text-sm text-gray-500">Scan & Pay instantly</p>
          </button>

          <button
            onClick={() => setPayment("cash")}
            className={`p-4 border rounded-xl text-left ${
              payment === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">Cash on Delivery</p>
            <p className="text-sm text-gray-500">Pay when you receive</p>
          </button>

          <button
            onClick={() => setPayment("card")}
            className={`p-4 border rounded-xl text-left ${
              payment === "card"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
          >
            <p className="font-medium">Credit / Debit Card</p>
            <p className="text-sm text-gray-500">Visa, MasterCard, etc.</p>
          </button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="text-right">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
