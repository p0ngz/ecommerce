import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

// component
import SidebarComponent from "./SidebarComponent";
import SearchModalComponent from "./SearchModalComponent";
const NavbarComponent = () => {
  // onMouseOver, onMouseOut
  const [onHoverFavorite, setOnHoverFavorite] = useState(false);
  const [onHoverProfile, setOnHoverProfile] = useState(false);
  const [onHoverShopping, setOnHoverShopping] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [activeSearchModal, setActiveSearchModal] = useState(false);
  const toggleSidebarHandler = () => {
    setActiveSidebar(!activeSidebar);
  };
  const receiveStatusSidebar = (status) => {
    setActiveSidebar(status);
  };
  const activeSearchModalHandler = () => {
    setActiveSearchModal(!activeSearchModal);
  };
  const receiveSearchState = (state) => {
    setActiveSearchModal(state);
  };

  return (
    <div
      id="navbar"
      className="sm:fixed md:fixed xl:fixed top-0 left-0 w-full md:h-15 xl:h-25  px-6 py-8 bg-gray-100  flex justify-between items-center z-99 relative"
    >
      <div id="left" className="">
        {/* sm and md screen */}
        <div
          id="left-md-screen"
          className="w-full h-full sm:flex sm:justify-center sm:items-center sm:gap-2 xl:hidden"
        >
          <DensityMediumIcon
            onClick={() => toggleSidebarHandler()}
            className="hover:cursor-pointer me-2 sm:me-4sm:scale-80  hover:scale-100"
          />
          <SearchIcon
            className="hover:cursor-pointer hover:text-emerald-800"
            onClick={() => activeSearchModalHandler()}
          />
        </div>

        {/* xl screen */}
        <div id="left-xl-screen" className="w-full h-full hidden xl:block">
          <Link to="/">
            <img
              src="https://wpbingo-adena.myshopify.com/cdn/shop/files/logo.png?crop=center&height=129&v=1729503852&width=399"
              alt="logo"
              className="w-[5.5rem] h-[1.5rem] hover:cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div id="center">
        {/* md screen */}
        <div id="center-md-screen" className="w-full h-full block  xl:hidden">
          <Link to="/">
            <img
              src="https://wpbingo-adena.myshopify.com/cdn/shop/files/logo.png?crop=center&height=129&v=1729503852&width=399"
              alt="logo"
              className="w-[5.5rem] h-[1.5rem] hover:cursor-pointer"
            />
          </Link>
        </div>

        {/* xl screen */}
        <div
          id="center-xl-screen"
          className="w-full xl:flex xl:items-center gap-4 hidden "
        >
          <div id="home-btn" className="hover:cursor-pointer">
            <Link to="/">
              <p>
                Home
                <KeyboardArrowDownIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </p>
            </Link>
          </div>
          <div id="products-btn" className="hover:cursor-pointer">
            <Link to="/products">
              <p>
                Products
                <KeyboardArrowDownIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </p>
            </Link>
          </div>
          <div id="blog-btn" className="hover:cursor-pointer">
            <Link to="/blog">
              <p>
                Blogs
                <KeyboardArrowDownIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div id="right">
        {/* md-screen */}
        <div id="right-md-screen" className="flex items-center gap-3 xl:hidden">
          {onHoverProfile ? (
            <Link to="/profile">
              <PersonIcon
                className="text-teal-500 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverProfile(false)}
              />
            </Link>
          ) : (
            <PersonOutlineIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverProfile(true)}
            />
          )}
          {onHoverFavorite ? (
            <Link to="/wishlist">
              <FavoriteIcon
                className="text-red-400 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverFavorite(false)}
              />
            </Link>
          ) : (
            <FavoriteBorderIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverFavorite(true)}
            />
          )}
          {onHoverShopping ? (
            <Link to="/shipping">
              <ShoppingBag
                className="text-fuchsia-600 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverShopping(false)}
              />
            </Link>
          ) : (
            <ShoppingBagOutlinedIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverShopping(true)}
            />
          )}
        </div>

        {/* xl screen */}
        <div
          id="right-xl-screen"
          className="hidden md:hidden xl:flex xl:items-center xl:gap-3"
        >
          <SearchIcon
            className="hover:cursor-pointer hover:text-emerald-800"
            onClick={() => activeSearchModalHandler()}
          />
          {onHoverProfile ? (
            <Link to="/profile">
              <PersonIcon
                className="text-teal-500 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverProfile(false)}
              />
            </Link>
          ) : (
            <PersonOutlineIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverProfile(true)}
            />
          )}
          {onHoverFavorite ? (
            <Link to="/wishlist">
              <FavoriteIcon
                className="text-red-400 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverFavorite(false)}
              />
            </Link>
          ) : (
            <FavoriteBorderIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverFavorite(true)}
            />
          )}
          {onHoverShopping ? (
            <Link to="/shipping">
              <ShoppingBag
                className="text-fuchsia-600 hover:cursor-pointer"
                onMouseLeave={() => setOnHoverShopping(false)}
              />
            </Link>
          ) : (
            <ShoppingBagOutlinedIcon
              className="hover:cursor-pointer"
              onMouseEnter={() => setOnHoverShopping(true)}
            />
          )}
        </div>
      </div>
      <SidebarComponent
        toggleSidebar={activeSidebar}
        sendStatusToParent={receiveStatusSidebar}
      />
      <SearchModalComponent
        searchModalState={activeSearchModal}
        sendStateToParent={receiveSearchState}
      />
    </div>
  );
};

export default NavbarComponent;
