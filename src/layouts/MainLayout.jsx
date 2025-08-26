import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="relative">
      <NavbarComponent />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
