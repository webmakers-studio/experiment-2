"use client";

import { Listing } from "@/data/listings";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/listing/${listing.id}`}>
        <motion.div className="relative mb-3">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{
                  scale: isFavorited ? 1.2 : 1,
                }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorited
                      ? "fill-red-500 text-red-500"
                      : "fill-black/50 text-white stroke-2"
                  }`}
                />
              </motion.div>
            </motion.button>

            {listing.images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <ChevronLeft />
                </motion.button>

                <motion.button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  <ChevronRight />
                </motion.button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
                  {listing.images.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      animate={{
                        scale: index === currentImageIndex ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 truncate">
              {listing.location}
            </p>
            <motion.div
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Star className="w-4 h-4 fill-current text-black" />
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-sm text-gray-500">
                ({listing.reviewCount})
              </span>
            </motion.div>
          </div>

          <motion.p
            className="text-gray-500 text-sm truncate"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {listing.title}
          </motion.p>

          <motion.div
            className="flex items-baseline space-x-1"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <span className="font-semibold text-gray-900">
              ${listing.price}
            </span>
            <span className="text-sm text-gray-500">night</span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
