import React from "react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
];

export default function GalleryGrid() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl group aspect-[16/9] cursor-pointer"
          >
            {/* Image */}
            <img
              src={src}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/50" />

            {/* Optional text */}
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm font-medium">Image {i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
