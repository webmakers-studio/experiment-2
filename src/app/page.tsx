"use client";

import PropertyCard from "@/components/PropertyCard";
import { listings } from "@/data/listings";
import { useState } from "react";
import Image from "next/image";

const categories = [
  { name: "Beachfront", icon: "🏖️", image: "/icons/beachfront.png" },
  { name: "Cabins", icon: "🏘️", image: "/icons/cabins.png" },
  { name: "Trending", icon: "🔥", image: "/icons/trending.png" },
  { name: "Countryside", icon: "🌾", image: "/icons/countryside.png" },
  { name: "Amazing pools", icon: "🏊‍♂️", image: "/icons/amazing-pools.png" },
  { name: "Luxe", icon: "💎", image: "/icons/luxe.png" },
  { name: "Tiny homes", icon: "🏠", image: "/icons/tiny-homes.png" },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("Trending");

  return (
    <>
      <div className="w-full overflow-hidden relative py-2">
        {/* Left Blur */}
        <div className="w-10 h-full bg-gradient-to-r from-white to-transparent absolute left-0 top-0 z-50 -translate-x-2"></div>
        <div className="flex w-full items-center gap-8 overflow-x-auto scrollbar-hide px-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex flex-col items-center gap-2 px-4 py-3 cursor-pointer min-w-fit whitespace-nowrap relative transition-all duration-200 group hover:text-gray-900 ${
                selectedCategory === category.name
                  ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:content-[""]'
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={52}
                  height={52}
                  className="transition-transform group-hover:scale-105"
                />
              ) : (
                <span className="text-2xl transition-transform group-hover:scale-105">
                  {category.icon}
                </span>
              )}

              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        {/* Right Blur */}
        <div className="w-10 h-full bg-gradient-to-l from-white to-transparent absolute right-0 top-0"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-6 py-4">
        {listings.map((listing) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
}
