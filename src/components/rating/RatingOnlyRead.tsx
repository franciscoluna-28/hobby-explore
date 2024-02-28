"use client";

import { Tables } from "@/lib/database";
import { useGetActivityCountRating } from "@/hooks/activities/useGetActivityCountRating";
import { Star } from "lucide-react"

type RatingOnlyReadProps = {
  activityId: Tables<"activities_rating">["activity_id"];
};

export function RatingReadOnly({ activityId }: RatingOnlyReadProps) {
  const { initialData } = useGetActivityCountRating({ activityId: activityId });



  return (
    <div className="flex gap-2 items-center">
      <Star fill="#F6B704" strokeWidth={0}/>
      <p className="text-[#F6B704] text-sm">{initialData?.rating}</p>
      <p className="text-[#D9D9D9] text-sm">({initialData?.count})</p>

    </div>
  );
}
