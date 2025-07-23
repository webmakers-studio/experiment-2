"use client";

import { listings } from "@/data/listings";
import Header from "@/components/Header";
import {
  Heart,
  Star,
  Share,
  MapPin,
  Users,
  Home,
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function ListingPage({ params }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const listing = listings.find((l) => l.id === params.id);

  if (!listing) {
    notFound();
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const calculateTotal = () => {
    const nights = 5;
    const subtotal = listing.price * nights;
    const serviceFee = Math.round(subtotal * 0.14);
    const taxes = Math.round(subtotal * 0.12);
    return {
      nights,
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes,
    };
  };

  const { nights, subtotal, serviceFee, taxes, total } = calculateTotal();

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="text-white hover:bg-white/10 rounded-lg p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-lg font-medium">
            {currentImageIndex + 1} / {listing.images.length}
          </h2>
          <div className="w-10"></div>
        </div>

        <div className="relative h-full flex items-center justify-center px-16">
          <button
            onClick={prevImage}
            className="absolute left-6 text-white hover:bg-white/10 rounded-full p-3 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={listing.images[currentImageIndex]}
              alt={listing.title}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 text-white hover:bg-white/10 rounded-full p-3 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              {listing.title}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg px-3 py-2">
                <Share className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-lg px-3 py-2">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Save</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-black" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-gray-500">
                ({listing.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span className="underline">{listing.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative aspect-square">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover hover:brightness-90 transition-all cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
            />
          </div>

          {listing.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`${listing.title} ${index + 2}`}
                fill
                className="object-cover hover:brightness-90 transition-all cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
              {index === 3 && listing.images.length > 5 && (
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium hover:bg-black/40 transition-colors"
                >
                  Show all {listing.images.length} photos
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 space-y-8">
            <div className="pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Hosted by {listing.host}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span>{listing.maxGuests} guests</span>
                    <span>·</span>
                    <span>{listing.bedrooms} bedrooms</span>
                    <span>·</span>
                    <span>{listing.beds} beds</span>
                    <span>·</span>
                    <span>{listing.bathrooms} bathrooms</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={listing.hostImage}
                    alt={listing.host}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Home className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Entire home</h3>
                    <p className="text-gray-600 text-sm">
                      You'll have the entire place to yourself.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Enhanced Clean
                    </h3>
                    <p className="text-gray-600 text-sm">
                      This host committed to Airbnb's enhanced cleaning
                      protocol.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Great location
                    </h3>
                    <p className="text-gray-600 text-sm">
                      90% of recent guests gave the location a 5-star rating.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-8 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {listing.description}
              </p>
            </div>

            <div className="pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                What this place offers
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-4 py-2">
                    <div className="w-6 h-6 text-gray-600">
                      {amenity === "WiFi" && "📶"}
                      {amenity === "Kitchen" && "🍳"}
                      {amenity === "Air conditioning" && "❄️"}
                      {amenity === "Heating" && "🔥"}
                      {amenity === "TV" && "📺"}
                      {amenity === "Washer" && "👕"}
                      {amenity === "Pool" && "🏊‍♂️"}
                      {amenity === "Parking" && "🅿️"}
                      {amenity === "Gym" && "🏋️‍♂️"}
                      {amenity === "Beach access" && "🏖️"}
                      {amenity === "Patio" && "🪴"}
                      {amenity === "BBQ grill" && "🔥"}
                      {amenity === "Fireplace" && "🔥"}
                      {amenity === "Hot tub" && "🛁"}
                      {amenity === "Ski storage" && "🎿"}
                      {amenity === "Garden" && "🌿"}
                      {amenity === "Workspace" && "💻"}
                      {amenity === "Laundry" && "👕"}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-5 h-5 fill-current text-black" />
                <span className="text-xl font-semibold">{listing.rating}</span>
                <span className="text-gray-500">
                  ({listing.reviewCount} reviews)
                </span>
              </div>

              <div className="text-center py-12 text-gray-500">
                <p>Reviews section would go here</p>
              </div>
            </div>
          </div>

          <div className="sticky top-24 h-fit">
            <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-baseline space-x-1 mb-6">
                <span className="text-2xl font-semibold">${listing.price}</span>
                <span className="text-gray-500">night</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      CHECK-IN
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-sm text-gray-600 bg-transparent outline-none"
                    />
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">
                      CHECKOUT
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-sm text-gray-600 bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3">
                  <label className="block text-xs font-semibold text-gray-900 mb-1">
                    GUESTS
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm text-gray-600 bg-transparent outline-none"
                  >
                    {Array.from({ length: listing.maxGuests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4">
                Reserve
              </button>

              <p className="text-center text-gray-600 text-sm mb-6">
                You won&apos;t be charged yet
              </p>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    ${listing.price} x {nights} nights
                  </span>
                  <span className="text-gray-700">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Service fee</span>
                  <span className="text-gray-700">${serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Taxes</span>
                  <span className="text-gray-700">${taxes}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
