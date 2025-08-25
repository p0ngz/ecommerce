import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon  from '@mui/icons-material/ShoppingBag';

const NavbarComponent = () => {
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
            <KeyboardArrowDownIcon fontSize="small" className="text-gray-400"  />
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
        <SearchIcon />
        <PersonOutlineIcon />
        <FavoriteBorderIcon />
        <ShoppingBagOutlinedIcon />
      </div>
      {/* create one navbar and responsive it this case is just full and md screen */}
    </div>
  );
};

export default NavbarComponent;
