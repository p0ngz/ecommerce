import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterSection from "../components/footer/FooterSection";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* md:h-15 xl:h-25  */}
      <NavbarComponent />
      <main className="w-full mt-15 md:mt-15 xl:mt-25">
        <Outlet/>
      </main>
      <FooterSection />
    </div>
  );
};

export default MainLayout;
