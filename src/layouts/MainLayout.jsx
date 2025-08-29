import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterSection from "../components/footer/FooterSection";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <NavbarComponent />
      <main className="w-full">
        <Outlet/>
      </main>
      <FooterSection />
    </div>
  );
};

export default MainLayout;
