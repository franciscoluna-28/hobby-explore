"use client";

import React, { useState } from "react";
import RatingIcon from "./RatingIcon";
import { useRateActivity } from "@/hooks/activities/useRateActivity";
import { Tables } from "@/lib/database";

type Props = {
  activityId: Tables<"activities_rating">["activity_id"];
};

const RatingContainer = ({ activityId }: Props) => {
  const { mutation, initialData } = useRateActivity({ activityId });
  const [hoverRating, setHoverRating] = useState<number>(0);

  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index: number) => {
    mutation.mutate(index);
  };

  return (
    <div className="box flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <RatingIcon
          key={index}
          index={index}
          rating={initialData ?? 0}
          hoverRating={hoverRating}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onSaveRating={onSaveRating}
        />
      ))}
    </div>
  );
};

export default RatingContainer;
