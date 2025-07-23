"use client";

import { Listing } from "@/data/listings";
import {
  AlignRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/listing/${listing.id}`} className="group">
      <div className="relative mb-3">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={listing.images[currentImageIndex]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorited
                  ? "fill-red-500 text-red-500"
                  : "fill-black/50 text-white stroke-2"
              }`}
            />
          </button>

          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
              >
                <ChevronRight />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                {listing.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-900 truncate">
            {listing.location}
          </p>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-black" />
            <span className="text-sm font-medium">{listing.rating}</span>
            <span className="text-sm text-gray-500">
              ({listing.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm truncate">{listing.title}</p>

        <div className="flex items-baseline space-x-1">
          <span className="font-semibold text-gray-900">${listing.price}</span>
          <span className="text-sm text-gray-500">night</span>
        </div>
      </div>
    </Link>
  );
}
