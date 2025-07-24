"use client";

import { Home, Users, MapPin, Shield, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface PropertyFeaturesProps {
  description: string;
}

const features = [
  {
    icon: Home,
    title: "Entire home",
    description: "You'll have the entire place to yourself.",
    color: "bg-blue-50 text-blue-600",
    bgColor: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "Enhanced Clean",
    description: "This host committed to Airbnb's enhanced cleaning protocol.",
    color: "bg-green-50 text-green-600",
    bgColor: "bg-green-500",
  },
  {
    icon: Award,
    title: "Great location",
    description: "90% of recent guests gave the location a 5-star rating.",
    color: "bg-purple-50 text-purple-600",
    bgColor: "bg-purple-500",
  },
];

export default function PropertyFeatures({
  description,
}: PropertyFeaturesProps) {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const truncatedDescription =
    description.length > 200
      ? description.substring(0, 200) + "..."
      : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">
            What makes this place special
          </h2>
        </div>
        <p className="text-gray-600">
          Discover the unique features that make this listing stand out
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
            >
              {/* Background Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: hoveredFeature === index ? 1 : 0,
                  opacity: hoveredFeature === index ? 0.1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute inset-0 rounded-xl ${feature.bgColor}`}
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: hoveredFeature === index ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
                className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${feature.bgColor}`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="border-t border-gray-100 pt-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full">
            <Home className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            About this space
          </h3>
        </div>

        <motion.div layout className="relative">
          <motion.p layout className="text-gray-700 leading-relaxed text-base">
            {expandedDescription ? description : truncatedDescription}
          </motion.p>

          {description.length > 200 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpandedDescription(!expandedDescription)}
              className="mt-3 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>{expandedDescription ? "Show less" : "Read more"}</span>
              <motion.div
                animate={{ rotate: expandedDescription ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 pt-6 border-t border-gray-100"
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Available now</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Free cancellation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Self check-in</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
