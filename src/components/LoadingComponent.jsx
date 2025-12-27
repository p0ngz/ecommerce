import React from "react";

// General Loading Spinner
const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

// Products Grid Loading
export const ProductsGridLoading = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Hero Section Loading
export const HeroSectionLoading = () => {
  return (
    <div className="w-full h-96 bg-gray-200 animate-pulse">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center space-y-4 w-full max-w-2xl px-4">
          <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

// Blog Card Skeleton
export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

// Blogs Grid Loading
export const BlogsGridLoading = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Profile Section Loading
export const ProfileLoading = () => {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 h-48 bg-gray-200"></div>
        <div className="bg-white rounded-lg shadow-md p-6 h-48 bg-gray-200"></div>
      </div>
    </div>
  );
};

// Order Card Skeleton
export const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  );
};

// Orders List Loading
export const OrdersListLoading = ({ count = 5 }) => {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: count }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Table Loading Skeleton
export const TableLoading = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-200 h-12 mb-2"></div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 p-4 border-b border-gray-100">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-4 bg-gray-200 rounded flex-1"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Page Section Loading
export const PageSectionLoading = () => {
  return (
    <div className="w-full space-y-6 p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
};

// Small Inline Spinner
export const InlineSpinner = ({ size = "sm", className = "" }) => {
  const sizes = {
    xs: "w-3 h-3 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`${sizes[size]} border-gray-300 border-t-blue-500 rounded-full animate-spin ${className}`}
    ></div>
  );
};

// Button Loading State
export const ButtonLoading = ({ text = "Loading...", className = "" }) => {
  return (
    <button
      disabled
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed ${className}`}
    >
      <InlineSpinner size="sm" />
      <span>{text}</span>
    </button>
  );
};

// Cart Item Skeleton
export const CartItemSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 animate-pulse">
      <div className="w-20 h-20 bg-gray-200 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

// Full Page Loading with Overlay
export const FullPageLoading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-700 font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
