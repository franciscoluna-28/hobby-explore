"use client";

import { Tables } from "@/lib/database";
import { useGetActivityCountRating } from "@/hooks/activities/useGetActivityCountRating";

type RatingOnlyReadProps = {
  activityId: Tables<"activities_rating">["activity_id"];
};

export function RatingReadOnly({ activityId }: RatingOnlyReadProps) {
  const { initialData } = useGetActivityCountRating({ activityId: activityId });

  return (
    <div>
      <p>{initialData}</p>
    </div>
  );
}
