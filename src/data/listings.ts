export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  host: string;
  hostImage: string;
  description: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
}

export const listings: Listing[] = [
  {
    id: "1",
    title: "Cozy Downtown Apartment",
    location: "New York, NY",
    price: 150,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
    ],
    host: "Sarah",
    hostImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    description: "A beautiful apartment in the heart of downtown with stunning city views and modern amenities.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Heating", "TV", "Washer"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2
  },
  {
    id: "2",
    title: "Modern Loft with City View",
    location: "San Francisco, CA",
    price: 200,
    rating: 4.9,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop"
    ],
    host: "Michael",
    hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    description: "Experience luxury living in this modern loft featuring floor-to-ceiling windows and premium finishes.",
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Gym", "Pool", "Parking"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    beds: 3
  },
  {
    id: "3",
    title: "Charming Beach House",
    location: "Santa Monica, CA",
    price: 300,
    rating: 4.7,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
    ],
    host: "Emma",
    hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    description: "Wake up to ocean views in this charming beach house just steps from the sand.",
    amenities: ["WiFi", "Kitchen", "Beach access", "Patio", "BBQ grill", "Parking"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    beds: 4
  },
  {
    id: "4",
    title: "Luxury Mountain Cabin",
    location: "Aspen, CO",
    price: 450,
    rating: 4.95,
    reviewCount: 67,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
    ],
    host: "James",
    hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    description: "Escape to this luxury mountain cabin with breathtaking views and world-class skiing nearby.",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot tub", "Ski storage", "Parking"],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    beds: 6
  },
  {
    id: "5",
    title: "Historic Brownstone",
    location: "Boston, MA",
    price: 180,
    rating: 4.6,
    reviewCount: 203,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop"
    ],
    host: "Rachel",
    hostImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    description: "Stay in this beautifully restored historic brownstone in the heart of Back Bay.",
    amenities: ["WiFi", "Kitchen", "Heating", "Garden", "Workspace", "Laundry"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    beds: 3
  },
  {
    id: "6",
    title: "Desert Oasis Villa",
    location: "Scottsdale, AZ",
    price: 350,
    rating: 4.8,
    reviewCount: 95,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ],
    host: "Carlos",
    hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    description: "Relax in this stunning desert villa with pool, spa, and panoramic mountain views.",
    amenities: ["WiFi", "Kitchen", "Pool", "Hot tub", "BBQ grill", "Parking"],
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    beds: 8
  }
];