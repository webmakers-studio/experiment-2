"use client";

import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("where");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
        <div className="flex items-center">
          <div
            className={`flex-1 px-6 py-3 rounded-full cursor-pointer transition-colors ${
              activeTab === "where" ? "bg-white shadow-md" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("where")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">Where</div>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Search destinations
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div
            className={`flex-1 px-6 py-3 rounded-full cursor-pointer transition-colors ${
              activeTab === "checkin" ? "bg-white shadow-md" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("checkin")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">Check in</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Add dates
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div
            className={`flex-1 px-6 py-3 rounded-full cursor-pointer transition-colors ${
              activeTab === "checkout" ? "bg-white shadow-md" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("checkout")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">Check out</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Add dates
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200" />

          <div
            className={`flex-1 px-6 py-3 rounded-full cursor-pointer transition-colors ${
              activeTab === "guests" ? "bg-white shadow-md" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("guests")}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Add guests
            </div>
          </div>

          <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full ml-2 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}