import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import WishlistCard from "./WishlistCard";
const wishlistProductData = [
  {
    id: 1,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro.jpg?v=1714967262&width=600",
    discount: 40,
    rating: 5,
    reviewCount: 127,
    titleProduct: "Apollop Coin Necklace",
    type: "necklace",
    description:
      "Elegant gold coin necklace featuring a vintage medallion design. Perfect for layering or wearing alone as a statement piece.",
    price: 100,
    dateAdded: "2024-09-15",
    status: "in_stock",
    stockQuantity: 15,
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["16 inch", "18 inch", "20 inch"],
    material: "18k Gold Plated",
    brand: "Luxe Collection",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-10",
    category: "jewelry",
    weight: "12g",
  },
  {
    id: 2,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-3.jpg?v=1714967344&width=600",
    discount: 0,
    rating: 4,
    reviewCount: 89,
    titleProduct: "Butterfly Ring",
    type: "rings",
    description:
      "Delicate butterfly-shaped ring crafted in sterling silver with intricate wing details. A symbol of transformation and beauty.",
    price: 65,
    dateAdded: "2024-09-20",
    status: "in_stock",
    stockQuantity: 8,
    colors: ["Silver", "Rose Gold"],
    sizes: ["5", "6", "7", "8", "9"],
    material: "Sterling Silver",
    brand: "Nature's Touch",
    isNew: true,
    isFavorite: true,
    lastPriceChange: null,
    category: "jewelry",
    weight: "3g",
  },
  {
    id: 3,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-5.jpg?v=1714968850&width=600",
    discount: 20,
    rating: 4.5,
    reviewCount: 156,
    titleProduct: "Cuban Link Chain Bracelet",
    type: "bracelets",
    description:
      "Bold Cuban link chain bracelet in premium gold-plated finish. Classic design that adds urban sophistication to any outfit.",
    price: 90,
    dateAdded: "2024-09-12",
    status: "low_stock",
    stockQuantity: 3,
    colors: ["Gold", "Silver"],
    sizes: ["7 inch", "8 inch", "9 inch"],
    material: "Stainless Steel Gold Plated",
    brand: "Urban Edge",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-08",
    category: "jewelry",
    weight: "25g",
  },
  {
    id: 4,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-12.jpg?v=1714968933&width=600",
    discount: 15,
    rating: 4.2,
    reviewCount: 73,
    titleProduct: "Dainty Chain Bracelet",
    type: "bracelets",
    description:
      "Minimalist chain bracelet with delicate links. Perfect for everyday wear and stacking with other jewelry pieces.",
    price: 80,
    dateAdded: "2024-09-18",
    status: "in_stock",
    stockQuantity: 22,
    colors: ["Gold", "Silver", "Rose Gold"],
    sizes: ["6.5 inch", "7.5 inch", "8.5 inch"],
    material: "14k Gold Filled",
    brand: "Minimal Chic",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-14",
    category: "jewelry",
    weight: "8g",
  },
  {
    id: 5,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-7.jpg?v=1714967450&width=600",
    discount: 0,
    rating: 4.8,
    reviewCount: 245,
    titleProduct: "Pearl Drop Earrings",
    type: "earrings",
    description:
      "Timeless pearl drop earrings with gold-filled hooks. Classic elegance that complements both casual and formal attire.",
    price: 120,
    dateAdded: "2024-09-25",
    status: "out_of_stock",
    stockQuantity: 0,
    colors: ["White Pearl", "Cream Pearl"],
    sizes: ["One Size"],
    material: "Freshwater Pearl & Gold Filled",
    brand: "Classic Elegance",
    isNew: true,
    isFavorite: true,
    lastPriceChange: null,
    category: "jewelry",
    weight: "4g",
    restockDate: "2024-10-05",
  },
  {
    id: 6,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-9.jpg?v=1714967580&width=600",
    discount: 25,
    rating: 4.6,
    reviewCount: 112,
    titleProduct: "Infinity Symbol Ring",
    type: "rings",
    description:
      "Modern infinity symbol ring representing eternal love and connection. Available in rose gold, silver, and gold finishes.",
    price: 85,
    dateAdded: "2024-09-10",
    status: "in_stock",
    stockQuantity: 12,
    colors: ["Rose Gold", "Silver", "Gold"],
    sizes: ["4", "5", "6", "7", "8", "9", "10"],
    material: "Sterling Silver",
    brand: "Eternal Love",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-05",
    category: "jewelry",
    weight: "5g",
  },
  {
    id: 7,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-11.jpg?v=1714967720&width=600",
    discount: 30,
    rating: 4.3,
    reviewCount: 98,
    titleProduct: "Layered Chain Necklace",
    type: "necklace",
    description:
      "Multi-layered chain necklace set with varying lengths. Creates a sophisticated layered look with just one piece.",
    price: 150,
    dateAdded: "2024-09-08",
    status: "in_stock",
    stockQuantity: 6,
    colors: ["Gold", "Silver"],
    sizes: ["14-16-18 inch", "16-18-20 inch"],
    material: "18k Gold Plated",
    brand: "Layered Luxury",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-01",
    category: "jewelry",
    weight: "18g",
  },
  {
    id: 8,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-20.jpg?v=1714967850&width=600",
    discount: 0,
    rating: 4.7,
    reviewCount: 203,
    titleProduct: "Geometric Stud Earrings",
    type: "earrings",
    description:
      "Contemporary geometric stud earrings with clean lines and modern appeal. Hypoallergenic posts suitable for sensitive ears.",
    price: 55,
    dateAdded: "2024-09-22",
    status: "in_stock",
    stockQuantity: 18,
    colors: ["Silver", "Gold", "Black"],
    sizes: ["Small", "Medium", "Large"],
    material: "Hypoallergenic Stainless Steel",
    brand: "Modern Geometry",
    isNew: true,
    isFavorite: true,
    lastPriceChange: null,
    category: "jewelry",
    weight: "2g",
  },
  {
    id: 9,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-16.jpg?v=1714967980&width=600",
    discount: 10,
    rating: 4.4,
    reviewCount: 67,
    titleProduct: "Tennis Bracelet",
    type: "bracelets",
    description:
      "Classic tennis bracelet with cubic zirconia stones in a continuous line. Sparkles beautifully and adjusts to fit most wrists.",
    price: 200,
    dateAdded: "2024-09-05",
    status: "low_stock",
    stockQuantity: 2,
    colors: ["Silver", "Gold"],
    sizes: ["6.5 inch", "7 inch", "7.5 inch"],
    material: "Sterling Silver with CZ",
    brand: "Sparkle & Shine",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-08-28",
    category: "jewelry",
    weight: "15g",
  },
  {
    id: 10,
    imgSrc: "https://wpbingo-adena.myshopify.com/cdn/shop/files/pro-18.jpg?v=1714968110&width=600",
    discount: 20,
    rating: 4.1,
    reviewCount: 54,
    titleProduct: "Vintage Signet Ring",
    type: "rings",
    description:
      "Vintage-inspired signet ring with engraved details. Can be personalized with initials for a unique, meaningful piece.",
    price: 95,
    dateAdded: "2024-09-14",
    status: "in_stock",
    stockQuantity: 9,
    colors: ["Gold", "Silver", "Antique Brass"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    material: "Brass Gold Plated",
    brand: "Vintage Craft",
    isNew: false,
    isFavorite: true,
    lastPriceChange: "2024-09-10",
    category: "jewelry",
    weight: "7g",
    customizable: true,
    engraving: ["Available", "2-3 weeks delivery"],
  },
];
const WishlistComponent = () => {
  return (
    <div id="wishlist-component" className="relative px-2 py-10 md:mt-15 xl:mt-25 w-full min-h-[70vh]">
      <h2 id="wishlist-title" className="mb-3 text-3xl">
        WishList
      </h2>
      <div id="wishlist-breadcrumb" className="breadcrumb">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{
            // styling separator
            "& .MuiBreadcrumbs-separator": {
              color: "inherit",
              fontWeight: "bold",
              fontSize: "1rem",
              mx: 1,
            },
          }}
        >
          <Link
            underline="hover"
            className="hover:cursor-pointer"
            color="inherit"
            href="/"
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
          >
            Home
          </Link>

          <Typography sx={{ color: "text.primary" }}>wishlist</Typography>
        </Breadcrumbs>
      </div>
      <div
        id="wishlist-product-container"
        className="px-2 py-5 sm:px-10 lg-px-15 flex flex-col gap-5 justify-center items-center sm:grid sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4"
      >
        {wishlistProductData.map((item) => {
          return (
            <WishlistCard
              key={item.id}
              imgSrc={item.imgSrc}
              titleProduct={item.titleProduct}
              discount={item.discount}
              rating={item.rating}
              reviewCount={item.reviewCount}
              description={item.description}
              price={item.price}
              type={item.type}
              dateAdded={item.dateAdded}
              status={item.status}
              stockQuantity={item.stockQuantity}
              colors={item.colors}
              sizes={item.sizes}
              material={item.material}
              brand={item.brand}
              isNew={item.isNew}
              isFavorite={item.isFavorite}
              lastPriceChange={item.lastPriceChange}
              category={item.category}
              weight={item.weight}
              restockDate={item.restockDate}
              customizable={item.customizable}
              engraving={item.engraving}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishlistComponent;
