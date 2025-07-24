"use client";

import { Heart, Star, Share, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface ListingHeaderProps {
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export default function ListingHeader({
  title,
  rating,
  reviewCount,
  location,
}: ListingHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);

    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this amazing place: ${title}`,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else if (typeof window !== "undefined") {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-start flex-col gap-4 md:flex-row justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 pr-6"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
            {title}
          </h1>
          <div className="flex items-center space-x-6 text-base">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-yellow-50 px-3 py-1.5 rounded-full"
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-gray-900">{rating}</span>
              <span className="text-gray-600">
                ({reviewCount.toLocaleString()} reviews)
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="font-medium underline decoration-blue-500 underline-offset-2">
                {location}
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center space-x-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm border ${
              isShared
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">{isShared ? "Shared!" : "Share"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm border ${
              isLiked
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <motion.div
              animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isLiked ? "fill-white" : "fill-none"
                }`}
              />
            </motion.div>
            <span className="text-sm">{isLiked ? "Saved" : "Save"}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Additional Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-between pt-4 border-t border-gray-100"
      >
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Instant Book</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Superhost</span>
          </span>
        </div>

        <div className="text-sm text-gray-500">Listed 2 days ago</div>
      </motion.div>
    </motion.div>
  );
}
