import { Star } from "lucide-react";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

export default function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Star className="w-5 h-5 fill-current text-black" />
        <span className="text-xl font-semibold">{rating}</span>
        <span className="text-gray-500">({reviewCount} reviews)</span>
      </div>

      <div className="text-center py-12 text-gray-500">
        <p>Reviews section would go here</p>
      </div>
    </div>
  );
}