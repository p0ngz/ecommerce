import React from "react";
import WishList from "./WishList";
const wishlistData = [
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    titleProduct: "Apollop Coin Necklace",
    type: "necklace",
    description:
      "1 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 100,
    amount: 5

  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    titleProduct: "Butterfly Ring",
    type: "rings",
    description:
      "2 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",
    price: 65,
    amount: 0
  },
  {
    imgSrc:
      "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600%22",
    discount: 20,
    rating: 4.5,
    titleProduct: "Cuban Link Chain Bracelet",
    type: "bracelets",
    description:
      "3 Curabitur egestas malesuada volutpat. Nunc vel vestibulum odio, ac pellentesque lacus. Pellentesque dapibus nunc nec estimperdiet, a malesuada sem rutrum",

    price: 90,
    amount: 10

  },
];
const UserWishlist = () => {
  return (
    <div
      id="user-wishlist-container"
      className="w-full h-full border border-gray-300 p-3 rounded-md flex flex-col gap-3"
    >
      {wishlistData.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold">Wishlist</h2>
          <div id="wishlist-container" className="sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistData.map((item, index) => {
              return <WishList key={index} wishlistInfo={item} />;
            })}
          </div>
        </>
      ) : (
        <span className="text-gray-400">No wishlist found...</span>
      )}
    </div>
  );
};

export default UserWishlist;
