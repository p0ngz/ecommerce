import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

// sidebar
import SidebarComponent from "./SidebarComponent";
const NavbarComponent = () => {
  // onMouseOver, onMouseOut
  const [onHoverFavorite, setOnHoverFavorite] = useState(false);
  const [onHoverProfile, setOnHoverProfile] = useState(false);
  const [onHoverShopping, setOnHoverShopping] = useState(false);
  return (
    <div
      id="navbar"
      className="h-25 w-full px-6 py-8 bg-gray-100 fixed flex justify-between items-center z-99"
    >
      <div id="left" className="">
        <img
          src="https://wpbingo-adena.myshopify.com/cdn/shop/files/logo.png?crop=center&height=129&v=1729503852&width=399"
          alt="logo"
          className="w-[5.5rem] h-[1.5rem]"
        />
      </div>
      <div id="center" className="flex items-center gap-4">
        <div className="">
          <p>
            Home
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400" />
          </p>
        </div>
        <div className="flex">
          <p>
            Shop
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400" />
          </p>
        </div>
        <div className="flex">
          <p>
            Product
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400" />
          </p>
        </div>
        <div className="flex">
          <p>
            Blog
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400" />
          </p>
        </div>
        <div className="flex">
          <p>
            Featured
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400" />
          </p>
        </div>
      </div>
      <div id="right" className="flex items-center gap-3">
        <SearchIcon className="hover:cursor-pointer hover:text-emerald-800" />
        {onHoverProfile ? (
          <PersonIcon
            className="text-teal-500 hover:cursor-pointer"
            onMouseLeave={() => setOnHoverProfile(false)}
          />
        ) : (
          <PersonOutlineIcon
            className="hover:cursor-pointer"
            onMouseEnter={() => setOnHoverProfile(true)}
          />
        )}
        {onHoverFavorite ? (
          <FavoriteIcon
            className="text-red-400 hover:cursor-pointer"
            onMouseLeave={() => setOnHoverFavorite(false)}
          />
        ) : (
          <FavoriteBorderIcon
            className="hover:cursor-pointer"
            onMouseEnter={() => setOnHoverFavorite(true)}
          />
        )}
        {onHoverShopping ? (
          <ShoppingBag
            className="text-fuchsia-600 hover:cursor-pointer"
            onMouseLeave={() => setOnHoverShopping(false)}
          />
        ) : (
          <ShoppingBagOutlinedIcon
            className="hover:cursor-pointer"
            onMouseEnter={() => setOnHoverShopping(true)}
          />
        )}
      </div>
      {/* create one navbar and responsive it this case is just full and md screen */}
      <SidebarComponent />
    </div>
  );
};

export default NavbarComponent;
