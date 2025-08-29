import React from "react";
import HeroSection from "../components/header/HeroSection";
import NewProductSection from "../components/content/NewProductSection";
import ProductsSection from "../components/content/ProductsSection";
import DescriptionSection from "../components/content/DescriptionSection";
import TopProductsSection from "../components/content/TopProductsSection";
import PromoteSection from "../components/content/PromoteSection";

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <NewProductSection />
      <ProductsSection />
      <DescriptionSection />
      <TopProductsSection />
      <PromoteSection />
    </div>
  );
};

export default HomePage;
