import React from "react";
import HeroSection from "../components/header/HeroSection";
import NewProductSection from "../components/content/NewProductSection";
import ProductsSection from "../components/content/ProductsSection";
import DescriptionSection from "../components/content/DescriptionSection";
import TopProductsSection from "../components/content/TopProductsSection";
import PromoteSection from "../components/content/PromoteSection";
import FooterSection from "../components/footer/FooterSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <NewProductSection />
      <ProductsSection />
      <DescriptionSection />
      <TopProductsSection />
      <PromoteSection />
      <FooterSection />
    </>
  );
};

export default HomePage;
