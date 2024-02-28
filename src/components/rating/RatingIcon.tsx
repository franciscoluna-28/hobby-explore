import React from "react";
import { Star } from "lucide-react";

interface RatingIconProps {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
}

const RatingIcon: React.FC<RatingIconProps> = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}: RatingIconProps) => {
  const fill: string = React.useMemo(() => {
    if (hoverRating >= index) {
      return "#F6B704";
    } else if (!hoverRating && rating >= index) {
      return "#F6B704";
    }
    return "none";
  }, [rating, hoverRating, index]);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <Star
        fill={fill}
        color={"#D9D9D9"}
        strokeWidth={fill === "#F6B704" ? 0 : 1}
      />
    </div>
  );
};

export default RatingIcon;
