"use client";

import { Star } from "lucide-react";

type RatingOnlyReadProps = {
  average?: number;
  count?: number;
};

export function RatingReadOnly({ average, count }: RatingOnlyReadProps) {
  const WIDTH_STROKE_TARGET = 0;

  return (
    <div className="flex gap-2 items-center">
      <Star
        fill={`${average ? "#F6B704" : "transparent"}`}
        absoluteStrokeWidth
        className="text-slate-300"
        strokeWidth={`${average ? WIDTH_STROKE_TARGET : 1.5}`}
      />

      <p
        className={`${average ? "text-[#F6B704]" : "!text-slate-300"} text-sm`}
      >
        {average ?? "No ratings yet..."}
      </p>
      {average && (
        <p className="text-sm !text-slate-300">{`(${count} ${
          count && count > 1 ? "reviews" : "review"
        })`}</p>
      )}
    </div>
  );
}
