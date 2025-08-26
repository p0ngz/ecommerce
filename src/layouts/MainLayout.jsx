import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="">
      <NavbarComponent/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
