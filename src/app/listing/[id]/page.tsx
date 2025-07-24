"use client";

import { listings } from "@/data/listings";
import { use } from "react";
import { notFound } from "next/navigation";
import ReserveSection from "@/components/ReserveSection";
import ListingHeader from "@/components/ListingHeader";
import ImageCarousel from "@/components/ImageCarousel";
import PropertyFeatures from "@/components/PropertyFeatures";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ListingPage({ params }: Props) {
  const resolvedParams = use(params);
  const listing = listings.find((l) => l.id === resolvedParams.id);

  if (!listing) {
    notFound();
  }

  return (
    <>
      <ImageCarousel images={listing.images} title={listing.title} />
      <ReserveSection price={listing.price} maxGuests={listing.maxGuests} />
      <ListingHeader
        title={listing.title}
        rating={listing.rating}
        reviewCount={listing.reviewCount}
        location={listing.location}
      />
      <PropertyFeatures description={listing.description} />
    </>
  );
}
