"use client";

import { Tables } from "@/lib/database";
import { useGetActivityCountRating } from "@/hooks/activities/useGetActivityCountRating";
import { Star } from "lucide-react";

type RatingOnlyReadProps = {
  activityId: Tables<"activities_rating">["activity_id"];
};

export function RatingReadOnly({ activityId }: RatingOnlyReadProps) {
  const { initialData } = useGetActivityCountRating({ activityId: activityId });
  const FIXED_NUMBER_TARGET = 2;
  const WIDTH_STROKE_TARGET = 0;
  const DEFAULT_RATING_AND_COUNT_VALUE = 0;

  return (
    <div className="flex gap-2 items-center">
      <Star fill="#F6B704" strokeWidth={WIDTH_STROKE_TARGET} />

      <p className="text-[#F6B704] text-sm">
        {Number(
          initialData?.rating.toFixed(FIXED_NUMBER_TARGET) ??
            DEFAULT_RATING_AND_COUNT_VALUE
        )}
      </p>
      <p className="text-[#D9D9D9] text-sm">
        ( {initialData?.count ?? DEFAULT_RATING_AND_COUNT_VALUE} )
      </p>
    </div>
  );
}
